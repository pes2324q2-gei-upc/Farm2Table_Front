import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const Medallas = ({ medals, userMedals, counter, tipus }) => {
  let dataToShow = [];

  const getStatus = (medal, userMedals) => {
    const foundMedal = userMedals.find((userMedal) => userMedal.name === medal.name);
    return foundMedal ? 'Completado' : 'En proceso';
  };

  // Si el tipo de usuario es minorista, mostrar sus medallas
  if (tipus === 'minorista') {
    dataToShow = medals.slice(10, 15).map((medal) => ({
      ...medal,
      status: getStatus(medal, userMedals),
    }));
  } else { // Si el tipo de usuario no es minorista, mostrar las medallas en grupos de 5
    dataToShow = medals.slice(0, 10).map((medal) => ({
      ...medal,
      status: getStatus(medal, userMedals),
    }));
  }

  // Añadir el contador de la resta y bloqueados por grupos de 5
  const updateStatusForGroups = (data, counter) => {
    let result = [];
    for (let i = 0; i < data.length; i += 5) {
      let group = data.slice(i, i + 5);
      let foundFirstBlocked = false;

      group = group.map((item, index) => {
        if (item.status === 'Completado') {
          return item;
        } else if (!foundFirstBlocked) {
          foundFirstBlocked = true;
          return {
            ...item,
            name: `Te faltan ${counter.next_purchase - counter.purchase} compras para alcanzar este nivel`,
            status: 'Resta',
          };
        } else {
          return {
            ...item,
            status: 'Bloqueado',
          };
        }
      });

      result = result.concat(group);
    }
    return result;
  };

  dataToShow = updateStatusForGroups(dataToShow, counter);

  return (
    <View style={styles.container}>
      <FlatList
        data={dataToShow}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            {item.logo && <Image source={{ uri: item.logo }} style={styles.image} />}
            <Text>{item.status === 'Resta' ? item.name : item.status}</Text>
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
    //backgroundColor: 'red',
    width: '100%',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: 400,
    //backgroundColor: 'blue',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default Medallas;
