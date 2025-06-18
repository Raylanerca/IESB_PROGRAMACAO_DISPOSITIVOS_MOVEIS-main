import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

export default function PetForm({ navigation, route }) {
  const petToEdit = route?.params?.pet;

  const [nome, setNome] = useState(petToEdit ? petToEdit.nome : '');
  const [raca, setRaca] = useState(petToEdit ? petToEdit.raca || '' : '');
  const [idade, setIdade] = useState(petToEdit ? String(petToEdit.idade) : '');
  const [peso, setPeso] = useState(petToEdit ? String(petToEdit.peso) : '');
  const [observacoes, setObservacoes] = useState(petToEdit ? petToEdit.observacoes : '');
  const [aniversario, setAniversario] = useState(
    petToEdit && petToEdit.aniversario ? new Date(petToEdit.aniversario) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const validarCampos = () => {
    let valid = true;
    let erros = {};

    if (!nome.trim()) {
      erros.nome = 'Nome é obrigatório';
      valid = false;
    }

    if (!raca.trim()) {
      erros.raca = 'Raça é obrigatória';
      valid = false;
    }

    const idadeNum = Number(idade);
    if (!idade || isNaN(idadeNum) || idadeNum <= 0) {
      erros.idade = 'Idade deve ser um número positivo';
      valid = false;
    }

    const pesoNum = Number(peso);
    if (!peso || isNaN(pesoNum) || pesoNum <= 0) {
      erros.peso = 'Peso deve ser um número positivo';
      valid = false;
    }

    setErrors(erros);
    return valid;
  };

  const agendarNotificacao = async (petId, nomePet, data) => {
    const agora = new Date();
    const proximoAniversario = new Date(data);
    proximoAniversario.setFullYear(agora.getFullYear());
    if (proximoAniversario < agora) {
      proximoAniversario.setFullYear(agora.getFullYear() + 1);
    }

    const idNotificacao = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎉 Aniversário do pet!',
        body: `Hoje é aniversário de ${nomePet}! Dê um carinho extra 🐾`,
      },
      trigger: {
        date: proximoAniversario,
        repeats: true, // repete todo ano
      },
    });

    return idNotificacao;
  };

  const cancelarNotificacao = async (idNotificacao) => {
    if (idNotificacao) {
      await Notifications.cancelScheduledNotificationAsync(idNotificacao);
    }
  };

  const salvarPet = async () => {
    if (!validarCampos()) return;

    try {
      const data = await AsyncStorage.getItem('pets');
      const pets = data ? JSON.parse(data) : [];

      if (petToEdit) {
        // Cancela notificação antiga
        await cancelarNotificacao(petToEdit.idNotificacao);

        // Atualiza pet e agenda nova notificação
        const updatedPets = await Promise.all(
          pets.map(async p => {
            if (p.id === petToEdit.id) {
              const idNotificacao = await agendarNotificacao(p.id, nome, aniversario);
              return {
                ...p,
                nome,
                raca,
                idade: Number(idade),
                peso: Number(peso),
                observacoes,
                aniversario,
                idNotificacao,
              };
            }
            return p;
          })
        );

        await AsyncStorage.setItem('pets', JSON.stringify(updatedPets));
      } else {
        // Novo pet
        const novoPet = {
          id: uuid.v4(),
          nome,
          raca,
          idade: Number(idade),
          peso: Number(peso),
          observacoes,
          aniversario,
        };

        const idNotificacao = await agendarNotificacao(novoPet.id, nome, aniversario);
        novoPet.idNotificacao = idNotificacao;

        pets.push(novoPet);
        await AsyncStorage.setItem('pets', JSON.stringify(pets));
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao salvar pet', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
        error={!!errors.nome}
        style={styles.input}
      />
      {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

      <TextInput
        label="Raça"
        value={raca}
        onChangeText={setRaca}
        error={!!errors.raca}
        style={styles.input}
      />
      {errors.raca && <Text style={styles.errorText}>{errors.raca}</Text>}

      <TextInput
        label="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        error={!!errors.idade}
        style={styles.input}
      />
      {errors.idade && <Text style={styles.errorText}>{errors.idade}</Text>}

      <TextInput
        label="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
        error={!!errors.peso}
        style={styles.input}
      />
      {errors.peso && <Text style={styles.errorText}>{errors.peso}</Text>}

      <TextInput
        label="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
        style={styles.input}
      />

      <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={{ marginBottom: 12 }}>
        Selecionar Data de Aniversário
      </Button>
      <Text>Data selecionada: {aniversario.toLocaleDateString()}</Text>

      {showDatePicker && (
        <DateTimePicker
          value={aniversario}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setAniversario(selectedDate);
          }}
        />
      )}

      <Button mode="contained" onPress={salvarPet}>
        Salvar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 4,
  },
});
