import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Import axios for making HTTP requests
import styles from '../Products/productDetails.style';

const ProductDetails = ({ navigation, id }) => {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    // Fetch product details when the component mounts
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://13.39.109.155/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {product && (
          <>
            <View style={styles.upperRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={33} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="heart" size={33} color="black" />
              </TouchableOpacity>
            </View>

            <Image source={{ uri: product.image }} style={styles.image} />

            <View style={styles.card}>
              <View style={styles.name_price}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.priceStyle}>
                  <Text style={styles.price}>{product.price} €/{product.unit}</Text>
                </View>
              </View>

              <ScrollView style={styles.description_row}>
                <Text style={styles.description}>{product.description}</Text>
              </ScrollView>

              <View style={styles.quanity_row}>
                <View style={styles.user_info_container}>
                  <View style={styles.userrow}>
                    <Text style={styles.user_name}>{product.productor_info.username}</Text>
                  </View>

                  <View style={styles.rating_row}>
                    <TouchableOpacity style={styles.quantity_button} onPress={decrement}>
                      <Ionicons name="remove" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{count}</Text>
                    <TouchableOpacity style={styles.quantity_button} onPress={increment}>
                      <Ionicons name="add" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.button_row}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.button_text}>Afegir {count} a la cistella</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductDetails;