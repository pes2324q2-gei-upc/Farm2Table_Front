import React from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const Product = ({ name, price, image }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.capsule}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.price}>{price} €/kg</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  price: {
    fontSize: 14,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  capsule: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 5,
    //flexGrow: 1,
    width: SIZES.width - 80,
    maxHeight: 200,
  }
});

export default Product;
