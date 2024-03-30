import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SliderProducts from './SliderProducts'; // Import the SliderProducts component
import {COLORS,  SIZES} from "../constants/theme";

const ShopFeed = ({ shopName, products }) => {
  return (
    <View style={styles.container}>
      {/* Shop name */}
      <Text style={styles.shopName}>{shopName}</Text>
      {/* SliderProducts */}
      <View  style={styles.width}>
        <SliderProducts productData={products} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  shopName: {
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  width:{
    width: SIZES.width - 20,
  }
});

export default ShopFeed;
