import React, { useContext } from 'react';
import { storeContext } from './StoreProvider';
import { SafeAreaView, View, Text, StatusBar, StyleSheet, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Componente funcional que representa un elemento del carrusel
const Item = ({ title, image }) => {
  return (
    <ImageBackground source={image} style={styles.item}>
      {title && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </ImageBackground>
  );
};

// Componente principal que muestra un carrusel de elementos
const CarouselList = () => {
  const [store] = useContext(storeContext);
  const restaurante = store.restaurantes;

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        data={restaurante}
        renderItem={({ item }) => (
          // Renderiza cada elemento utilizando el componente 'Item'
          <Item title={item.title} image={item.image} />
        )}
        sliderWidth={400}
        itemWidth={300}
        inactiveSlideScale={1} 
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
    width: 300,
    height: 175,
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});


export default CarouselList;
