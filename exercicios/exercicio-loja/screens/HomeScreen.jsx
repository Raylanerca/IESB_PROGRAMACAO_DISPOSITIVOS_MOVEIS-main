import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(response => setCategorias(response.data))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Produtos', { categoria: item.slug })}>
      <Card style={{ margin: 10 }}>
        <Card.Content>
          <Text>{item.name}</Text> {/* Aqui precisa estar dentro de <Text> */}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
  

  return (
    <FlatList
      data={categorias}
      keyExtractor={(item, index) => item.slug || index.toString()}
      renderItem={renderItem}
    />
  );
}