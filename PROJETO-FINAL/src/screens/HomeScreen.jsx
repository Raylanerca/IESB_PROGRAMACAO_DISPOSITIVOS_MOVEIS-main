import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, View } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

const petImages = [
  'https://placedog.net/400/300?id=99',
  'https://placedog.net/400/300?id=1',
  'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=60',
  'https://placedog.net/401/300?id=2',
];

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [catImage, setCatImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const buscarGatinhoFofo = async () => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      setCatImage(`https://cataas.com/cat?${timestamp}`);
    } catch (error) {
      console.error('Erro ao buscar gatinho:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % petImages.length;
      setCurrentIndex(nextIndex);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: nextIndex * width, animated: true });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        scrollEnabled={false}
      >
        {petImages.map((uri, index) => (
          <Image key={index} source={{ uri }} style={[styles.carouselImage, { width }]} />
        ))}
      </ScrollView>

      <Card style={styles.card}>
        <Card.Title title="🐾 Bem-vindo ao App de Pets!" titleStyle={styles.cardTitle} />
        <Card.Content>
          <Text style={styles.text}>
            Gerencie seus pets, registre vacinas e acompanhe aniversários!{'\n\n'}
            E o melhor: clique no botão abaixo para ver um gatinho aleatório e fofo! 🐱💕
          </Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            buttonColor="#9C27B0"
            textColor="#fff"
            onPress={() => navigation.navigate('Pets')}
          >
            Ver Pets
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="😻 Gatinho do dia" titleStyle={styles.cardTitle} />
        <Card.Content>
          <Button
            mode="contained"
            buttonColor="#7B1FA2"
            textColor="#fff"
            onPress={buscarGatinhoFofo}
            loading={loading}
            disabled={loading}
            style={{ marginBottom: 12 }}
          >
            Ver Gatinho Fofo
          </Button>
          {catImage && (
            <View style={styles.catImageContainer}>
              <Image source={{ uri: catImage }} style={styles.catImage} />
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    backgroundColor: '#F5E8FC',
  },
  carousel: {
    height: 200,
    marginBottom: 16,
  },
  carouselImage: {
    height: 200,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  catImageContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  catImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
});
