import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, { useContext } from 'react';
import { storeContext } from './StoreProvider';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Componente funcional que representa un elemento de la lista de shows
const Item = ({ title, image, description, rating, address, coordinates }) => {
  const navigation = useNavigation();

  // Función manejadora de presión en un elemento, navega a la pantalla de Detalles
  const handlePress = () => {
    navigation.navigate('Detalle', { item: { title, image, description, rating, address, coordinates } });
  };

  // Retorna un elemento de lista envuelto en TouchableOpacity para la interactividad
  return (
    <TouchableOpacity onPress={handlePress}>
      <ImageBackground source={{ uri: image }} style={styles.item}>
        {title && (
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

// Componente principal que muestra una lista horizontal de shows
const Shows = () => {
  const [store] = useContext(storeContext);

  // Extrae la lista plana de shows del contexto
  const flatShow = store.showsFlat;

  // Retorna una SafeAreaView con una FlatList de elementos de show
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={flatShow}
        renderItem={({ item }) => (
          <Item title={item.title} image={item.image} description={item.description} address={item.address} rating={item.rating} coordinates={item.coordinates} />
        )}
        keyExtractor={item => item.id}
        horizontal
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    width: 200,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Shows;
