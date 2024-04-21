import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/productDetails.style';
import Footer from '../navigation/footer';
import HeaderBack from '../navigation/header_back';
import { URL } from '../constants/theme';
import CartPopUp from '../PopUps/addedCart';

const ProductDetails = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const { id } = route.params;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://` + URL + `/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const productData = await response.json();
        setProduct(productData);

        // Fetch user avatar
        const userResponse = await fetch(`http://` + URL + `/users/profile/${productData.productor_info.id}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await userResponse.json();
        setUserAvatar(userData.data.avatar);
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

  const addToCart = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <ScrollView>
        {product && (
          <>
          <SafeAreaView style={styles.container}>
        
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
                    {userAvatar && <Image source={{ uri: userAvatar }} style={styles.user_image} />}
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
                <TouchableOpacity style={styles.button} onPress={addToCart}>
                  <Text style={styles.button_text}>Afegir {count} a la cistella</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
          </>
        )}
      </ScrollView>
      <CartPopUp
        isVisible={modalVisible}
        onContinueShopping={() => setModalVisible(false)}
        onGoToCart={() => {
          setModalVisible(false);
          navigation.navigate('AddProduct'); // Make sure 'Cart' is the correct route name
        }}
      />
    </SafeAreaView>
  );
};

export default ProductDetails;
