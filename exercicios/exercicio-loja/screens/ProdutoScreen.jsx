import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, Text, Paragraph } from 'react-native-paper';
import axios from 'axios';

export default function ProdutoScreen({ route }) {
  const { idProduto } = route.params;
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${idProduto}`)
      .then(response => setProduto(response.data))
      .catch(error => console.error(error));
  }, [idProduto]);

  if (!produto) return <Text>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <Card>
        <Card.Cover source={{ uri: produto.thumbnail }} />
        <Card.Content>
            <Title>{produto.title}</Title>
            <Paragraph>{produto.description}</Paragraph> {/* ✅ */}
            <Text>Preço: R$ {produto.price}</Text>
            <Text>Marca: {produto.brand}</Text>
            <Text>Categoria: {produto.category}</Text>
        </Card.Content>

      </Card>
    </ScrollView>
  );
}