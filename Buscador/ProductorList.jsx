import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import styles  from '../styles/buscador.style';
import { TouchableOpacity } from 'react-native'
import Consultar_Usuario from '../Users/Consultar_Usuario';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ProfileScreen from '../Users/CheckUser';
const ProductorList = ({ data, searchQuery }) => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('ProfileScreen', { idUser: item.id, typeUser: "Productor" })  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.lista}>
        <Image source={{ uri: item.avatar }} style={styles.image} />
        <View>
          <Text style={styles.textName}>{item.username}</Text>
          <Text style={styles.textEmail}>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data.filter(item => item.username.toLowerCase().includes(searchQuery.toLowerCase()))}
      keyExtractor={item => item.username.toString()}
      renderItem={renderItem}
    />
  );
};

export default ProductorList;