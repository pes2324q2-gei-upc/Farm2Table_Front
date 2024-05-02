import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import styles from '../styles/buscador.style';
import { TouchableOpacity } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ProductList = ({ data, searchQuery }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
      <View style={styles.lista}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View>
          <Text style={styles.textName}>{item.name}</Text>
          <Text style={styles.textEmail}>{item.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default ProductList;