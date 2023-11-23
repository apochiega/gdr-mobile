import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StoreProvider from './componenets/StoreProvider';
import CarouselList from './componenets/CarouselRestaurantes';
import SearchBarComp from './componenets/SearchBarAuto';
import Restaurantes from './componenets/FlatListRestaurantes';
import Shows from './componenets/FlatListShow';
import Detalles from './componenets/Detalle';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detalle" component={Detalles} />
        </Stack.Navigator>
      </StoreProvider>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <CarouselList />
      <SearchBarComp />
      <Restaurantes />
      <Shows />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
