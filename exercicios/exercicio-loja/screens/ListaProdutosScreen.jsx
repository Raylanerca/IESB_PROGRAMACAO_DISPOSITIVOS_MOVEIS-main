import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import axios from 'axios';

export default function ListaProdutosScreen({ route, navigation }) {
  const { categoria } = route.params;
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${categoria}`)
      .then(response => setProdutos(response.data.products))
      .catch(error => console.error(error));
  }, [categoria]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Produto', { idProduto: item.id })}>
      <Card style={{ margin: 10 }}>
        <Card.Cover source={{ uri: item.thumbnail }} />
        <Card.Content>
          <Title>{item.title}</Title>
          <Text>R$ {item.price}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}