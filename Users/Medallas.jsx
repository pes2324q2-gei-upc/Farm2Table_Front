import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const Medallas = ({ medals, userMedals, counter, tipus }) => {
  let dataToShow = [];

  // Si el tipo de usuario es minorista, mostrar sus medallas
  if (tipus === 'minorista') {
    dataToShow = medals.slice(0, 4).map((medal) => {
      const foundMedal = userMedals.find((userMedal) => userMedal.name === medal.name);
      return {
        ...medal,
        status: foundMedal ? 'Completado' : 'En proceso',
      };
    });
  } else { // Si el tipo de usuario no es minorista, mostrar las medallas desde la 4 hasta la 11
    dataToShow = userMedals.slice(4, 12).map((medal) => ({
      ...medal,
      status: 'En proceso',
    }));
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataToShow}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.logo }} style={styles.image} />
            <Text>{item.name}</Text>
            <Text>{item.status}</Text>
            <Text>{(counter.next_purchase - counter.purchase)}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text>No tienes ninguna medalla.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default Medallas;
