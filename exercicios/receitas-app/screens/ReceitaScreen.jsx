import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';

export default function DetalhesScreen({ route, navigation }) {
  const { receita } = route.params;

  return (
    <ScrollView style={{ padding: 10 }}>
      <Card>
        <Card.Cover source={{ uri: receita.imagem }} />
        <Card.Content>
          <Title>{receita.nome}</Title>
          <Paragraph>Tempo: {receita.tempoPreparo}</Paragraph>
          <Paragraph>Porções: {receita.porcoes}</Paragraph>

          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Ingredientes:</Text>
          {receita.ingredientes.map((item, i) => (
            <Text key={i}>• {item}</Text>
          ))}

          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Modo de Preparo:</Text>
          {receita.modoPreparo.map((passo, i) => (
            <Text key={i}>{passo}</Text>
          ))}
        </Card.Content>
      </Card>

      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()} 
        style={{ marginTop: 20 }}
      >
        Voltar
      </Button>
    </ScrollView>
  );
}