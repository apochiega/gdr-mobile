import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TextInput, View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { storeContext } from './StoreProvider';
import { useNavigation } from '@react-navigation/native';

// Componente funcional que representa la barra de búsqueda y los resultados filtrados
const SearchBarComp = () => {
  const [searchPhrase, setSearchPhrase] = useState("");

  // Estado para almacenar los datos filtrados
  const [filteredData, setFilteredData] = useState([]);

  const [store] = useContext(storeContext);

  const navigation = useNavigation();

  useEffect(() => {
    // Filtra los datos según la frase de búsqueda
    const filtered = (searchPhrase !== "")
      ? store.restaurantesFlat.concat(store.showsFlat).filter((item) =>
        item.title.toLowerCase().includes(searchPhrase.toLowerCase())
      )
      : [];

    // Actualiza el estado de los datos filtrados
    setFilteredData(filtered);
  }, [searchPhrase, store.restaurantesFlat, store.showsFlat]);

  // Función que renderiza cada elemento en la lista de resultados
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        console.log(`Elemento seleccionado: ${item.title}`);
        navigation.navigate('Detalle', { item });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={(text) => setSearchPhrase(text)}
        />
        {/* Icono para borrar la frase de búsqueda */}
        {searchPhrase !== "" && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => setSearchPhrase("")}
          />
        )}
      </View>
      {/* Lista de resultados filtrados */}
      {searchPhrase !== "" && (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

export default SearchBarComp;


const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    width: "90%",
  },
  searchBar: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  flatList: {
    marginTop: 10,
    width: "100%",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
