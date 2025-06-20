import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';

const COLORS = {
  primary: '#7B61FF',       // roxo vibrante
  secondary: '#B497FF',     // lilás claro
  background: '#F5F1FF',    // lilás bem clarinho
  textPrimary: '#3B006E',   // roxo escuro
  textSecondary: '#6E4AB5', // lilás escuro
  error: '#D32F2F',
  white: '#fff',
};

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
  const [fotoUri, setFotoUri] = useState(petToEdit ? petToEdit.fotoUri : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Notifications.requestPermissionsAsync();
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de permissão para acessar a galeria de fotos.');
      }
    })();
  }, []);

  const escolherFoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setFotoUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro ao escolher foto', error.message);
    }
  };

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
        repeats: true,
      },
    });
    return idNotificacao;
  };

  const cancelarNotificacao = async (idNotificacao) => {
    if (idNotificacao) {
      try {
        await Notifications.cancelScheduledNotificationAsync(idNotificacao);
      } catch (error) {
        console.warn('Erro ao cancelar notificação:', error);
      }
    }
  };

  const salvarPet = async () => {
    if (!validarCampos()) return;

    try {
      const data = await AsyncStorage.getItem('pets');
      const pets = data ? JSON.parse(data) : [];

      if (petToEdit) {
        await cancelarNotificacao(petToEdit.idNotificacao);

        let updatedPets = pets.map(p =>
          p.id === petToEdit.id
            ? {
                ...p,
                nome,
                raca,
                idade: Number(idade),
                peso: Number(peso),
                observacoes,
                aniversario: aniversario.toISOString(),
                fotoUri,
              }
            : p
        );

        const petAtualizado = updatedPets.find(p => p.id === petToEdit.id);
        const idNotificacao = await agendarNotificacao(petAtualizado.id, nome, aniversario);
        updatedPets = updatedPets.map(p =>
          p.id === petToEdit.id ? { ...p, idNotificacao } : p
        );

        await AsyncStorage.setItem('pets', JSON.stringify(updatedPets));
      } else {
        const novoPet = {
          id: uuid.v4(),
          nome,
          raca,
          idade: Number(idade),
          peso: Number(peso),
          observacoes,
          aniversario: aniversario.toISOString(),
          fotoUri,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <TouchableOpacity onPress={escolherFoto} style={styles.imageContainer}>
          {fotoUri ? (
            <Image source={{ uri: fotoUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Toque para escolher uma foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          error={!!errors.nome}
          style={styles.input}
          mode="outlined"
          activeOutlineColor={COLORS.primary}
          outlineColor={COLORS.secondary}
          placeholderTextColor={COLORS.textSecondary}
        />
        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

        <TextInput
          label="Raça"
          value={raca}
          onChangeText={setRaca}
          error={!!errors.raca}
          style={styles.input}
          mode="outlined"
          activeOutlineColor={COLORS.primary}
          outlineColor={COLORS.secondary}
        />
        {errors.raca && <Text style={styles.errorText}>{errors.raca}</Text>}

        <TextInput
          label="Idade"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
          error={!!errors.idade}
          style={styles.input}
          mode="outlined"
          activeOutlineColor={COLORS.primary}
          outlineColor={COLORS.secondary}
        />
        {errors.idade && <Text style={styles.errorText}>{errors.idade}</Text>}

        <TextInput
          label="Peso (kg)"
          value={peso}
          onChangeText={setPeso}
          keyboardType="numeric"
          error={!!errors.peso}
          style={styles.input}
          mode="outlined"
          activeOutlineColor={COLORS.primary}
          outlineColor={COLORS.secondary}
        />
        {errors.peso && <Text style={styles.errorText}>{errors.peso}</Text>}

        <TextInput
          label="Observações"
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
          style={[styles.input, { height: 80 }]}
          mode="outlined"
          activeOutlineColor={COLORS.primary}
          outlineColor={COLORS.secondary}
        />

        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          style={[styles.button, { marginBottom: 12, borderColor: COLORS.primary }]}
          textColor={COLORS.primary}
        >
          Selecionar Data de Aniversário
        </Button>
        <Text style={{ color: COLORS.textPrimary, marginBottom: 16 }}>
          Data selecionada: {aniversario.toLocaleDateString()}
        </Text>

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

        <Button
          mode="contained"
          onPress={salvarPet}
          style={[styles.button, { backgroundColor: COLORS.primary }]}
          textColor={COLORS.white}
        >
          Salvar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderRadius: 20,       // Aumentei para 30 aqui
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 8,
    marginLeft: 4,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 30,      // Também arredondado para combinar
    overflow: 'hidden',
    width: 150,
    height: 150,
    backgroundColor: '#E6E0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  button: {
    borderRadius: 24,
    paddingVertical: 8,
  },
});
