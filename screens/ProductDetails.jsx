import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/productDetails.style';
import HeaderBack from '../navigation/header_back';
import { COLORS, URL } from '../constants/theme';
import { addProductToCart, loadCart, saveCart } from '../informacion/cartInfo';
import { addFavourite } from '../api_service/APIFavoritos';
import { userId, setUserId, userType } from '../informacion/User';
import CartPopUp from '../PopUps/addedCart';
import OpenChat from "../components/openChat";
import {ChatStackScreen} from "../navigation/footer"

const ProductDetails = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const cartIconRef = useRef();
  const user = userId();

  const { id } = route.params;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://` + URL + `/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const productData = await response.json();
        console.log('Product data:', productData);
        setProduct(productData);
        console.log('Product:', product);

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
    console.log('Product:', product)
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleOpenChatPress = () => {
    navigation.navigate("ChatStackScreen", {
      screen: "OpenChat",
      params: {
        productId: product.id,
        authorId: user,
        receiverId: product.productor_info.id,
        receiverUsername: product.productor_info.username
      }
    });
  };

  const handleAddFavourite = async () => {
    try {
      const typeUser = userType().toLowerCase() + 's';
      console.log('User type:', typeUser);
      const response = await addFavourite(user, 'products', typeUser, product.id);
      console.log('Add favourite response:', response);
    } catch (error) {
      console.error('Failed to add favourite:', error);
    }
  };
    


  const addToCart = async () => {

    let cart = []

    if (!loadCart(userId())) {
      console.log('No cart found for user:', userId());
      saveCart(userId(), []);
    }
    else {
      console.log('Cart found for user:', userId());
      const loadedCart = await loadCart(userId());
      console.log('Loaded cart:', loadedCart);
      cart = loadedCart;
    }

    const newCartItem = {
      productId: product.id,
      name: product.name,
      quantity: count,
      price: product.price,
    };

    if (cartIconRef.current) {
      cartIconRef.current.triggerCartAnimation();
      Vibration.vibrate(200);
    }

    console.log('Cart Items:', cart);
    const updatedCart = addProductToCart(cart, product.productor_info.id, newCartItem, product.productor_info.username, product.productor_info.avatar);
    console.log('Updated cart:', updatedCart);
    await saveCart(userId(), updatedCart); // Asumiendo que saveCart maneja el guardado en AsyncStorage o similar
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack ref={cartIconRef} />
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

              <View style={styles.button_bottom_row}>
                <OpenChat onPress={handleOpenChatPress} />
                <TouchableOpacity style={styles.buttonLove} onPress={handleAddFavourite}>
                  <Text style={styles.button_text}>Add Favourite</Text>
                  <Ionicons name="heart" size={20} color={COLORS.primary} />
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
