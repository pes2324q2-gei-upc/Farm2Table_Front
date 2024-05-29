import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SliderProducts from './SliderProducts'; // Import the SliderProducts component
import {COLORS,  SIZES} from "../constants/theme";


const ShopFeed = ({ navigation, data }) => {

  const handleProductor = () => {
    navigation.navigate('CheckUser', { idUser: data.id, typeUser: 'Productor' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProductor}>
        <Text style={styles.shopName}>{data.productor_name}</Text>
      </TouchableOpacity>
      <View  style={styles.width}>
        <SliderProducts productData={data.products_info} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    marginVertical: 20,
  },
  shopName: {
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  width:{
    width: SIZES.width * 0.9,
  }
});

export default ShopFeed;
