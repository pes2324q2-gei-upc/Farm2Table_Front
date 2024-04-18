import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import Product from './Product2'; // Assuming Product component is in the same directory
import { Carousel } from 'react-native-snap-carousel';

const ProductCarousel = () => {
  // Example array of products
  const products = [
    { imageSource: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w=', title: 'Product 1', price: '10 €' },
    { imageSource: 'https://media.istockphoto.com/id/185284489/photo/orange.jpg?s=612x612&w=0&k=20&c=m4EXknC74i2aYWCbjxbzZ6EtRaJkdSJNtekh4m1PspE=', title: 'Product 2', price: '15 €' },
    { imageSource: 'https://fruitboxco.com/cdn/shop/products/asset_2_grande.jpg?v=1571839043', title: 'Product 3', price: '20 €' },
  ];

  const renderProduct = ({ item }) => (
    <Product
      imageSource={item.imageSource}
      title={item.title}
      price={item.price}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        data={products}
        renderItem={renderProduct}
        sliderWidth={300}
        itemWidth={300}
        loop
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default ProductCarousel;
