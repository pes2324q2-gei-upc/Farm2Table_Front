import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, ActivityIndicator } from 'react-native';
import styles from '../styles/buscador.style';
import { TouchableOpacity } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ProductList = ({ data, searchQuery }) => {
  const navigation = useNavigation();
  const [loadingStates, setLoadingStates] = useState(new Array(data.length).fill(false));

  const onLoading = (index, value) => {
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[index] = value;
    setLoadingStates(updatedLoadingStates);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
      <View style={styles.lista}>
        {loadingStates[index] && (
            <ActivityIndicator 
              color="grey"
              style={styles.activityIndicator} 
            />
          )}
        {<Image 
          key={item.id}
          source={{ uri: item.image }} 
          style={styles.image}
          onLoadStart={() => onLoading(index, true)}
          onLoadEnd={() => onLoading(index, false)}
          />
        }
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
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => renderItem({ item, index })}
    />
  );
};

export default ProductList;