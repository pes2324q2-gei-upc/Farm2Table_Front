import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import styles from '../styles/buscador.style';
import { TouchableOpacity } from 'react-native'
import Restaurante from '../Restaurants/Restaurante';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getPalabra } from '../informacion/User'
import { Entypo } from '@expo/vector-icons';

const MercatList = ({ data, searchQuery }) => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('ProfileScreen', { idUser: item.id, typeUser: "Productor" })  };

  const renderItem = ({ item }) => {    
    return (
      <TouchableOpacity onPress={() =>  handlePress(item)}>
        <View style={styles.lista}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Render the icon */}
            <Entypo name="shop" size={24} color="black" />
            {/* Render the item's name */}
            <Text style={styles.textName}>{item.service_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {data.length === 0 ? (
        <View style={styles.empty}>
          <Text>{getPalabra("no_markets")}</Text>
        </View>
      ) : (
          <FlatList
            data={data.filter(item => item.service_name.toLowerCase().includes(searchQuery.toLowerCase()))}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
      )}
    </>
  );
};

export default MercatList;