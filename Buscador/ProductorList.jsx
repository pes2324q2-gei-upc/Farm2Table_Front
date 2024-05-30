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
    console.log("id es: "+item.id);
    navigation.navigate('ProfileScreen', { idUser: item.id, typeUser: "Productor" })  };

    const renderItem = ({ item }) => {
      const avatarUri = item.avatar ? { uri: item.avatar } : require('../assets/images/149071.png');
      
      return (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View style={styles.lista}>
            <Image
              source={avatarUri}
              style={styles.image}
            />
            <View>
              <Text style={styles.textName}>{item.productor_name}</Text>
              <Text style={styles.textEmail}>{item.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

  return (
    <FlatList
      data={data.filter(item => item.username.toLowerCase().includes(searchQuery.toLowerCase()))}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default ProductorList;