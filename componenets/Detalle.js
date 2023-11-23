import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Componente funcional que muestra las estrellas de calificación
const Rating = ({ value }) => {
  // Calcula el número de estrellas redondeando el valor de la calificación
  const numberOfStars = Math.min(Math.round(value), 5);

  // Crea un array de estrellas con el emoji de estrella
  const stars = Array.from({ length: numberOfStars }).map((_, index) => (
    <Text key={index} style={styles.star}>
      ⭐
    </Text>
  ));

  // Retorna el contenedor de las estrellas
  return <View style={styles.ratingContainer}>{stars}</View>;
};

// Componente principal que muestra detalles de un elemento
const Detalles = ({ route }) => {
  const { item } = route.params;

  // Manejo de caso en el que no hay datos válidos en el elemento
  if (!item) {
    console.error('Error: El elemento no contiene datos válidos');
    return <Text style={styles.errorText}>Error: El elemento no contiene datos válidos</Text>;
  }

  // Extrae propiedades relevantes del elemento
  const { title, image, description, rating, address, coordinates } = item;

  // Retorna la vista con detalles del elemento
  return (
    <View style={styles.container}>
      {/* Muestra el mapa si hay coordenadas disponibles */}
      {coordinates && (
        <MapView
          style={{ flex: 0, width: '75%', height: 200, marginBottom: 20 }}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
            title={title}
            description={address}
          />
        </MapView>
      )}
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {title && <Text style={[styles.text, styles.title]}>{title}</Text>}
      {description && <Text style={[styles.text, styles.description]}>{description}</Text>}
      {rating && <Rating value={rating} />}
      {address && <Text style={[styles.text, styles.address]}>Dirección: {address}</Text>}

      <Button title="Contacto" onPress={() => handleContactPress()} />
    </View>
  );
};

const handleContactPress = () => {
  console.log('Botón de contacto presionado');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  star: {
    fontSize: 20,
    color: 'gold',
  },
  address: {
    fontSize: 16,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Detalles;
