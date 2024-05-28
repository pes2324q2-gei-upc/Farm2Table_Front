import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/productDetails.style';
import HeaderBack from '../navigation/header_back';
import { COLORS, URL } from '../constants/theme';
import { addProductToCart, loadCart, saveCart } from '../informacion/cartInfo';
import { addFavourite, isUserFavourite, removeFavourite } from '../api_service/APIFavoritos';
import { userId, setUserId, userType, getPalabra } from '../informacion/User';
import CartPopUp from '../PopUps/addedCart';
import OpenChat from "../components/openChat";
import addToCart from '../api_service/CartService';

const ProductDetails = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
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
        setProduct(productData);

        // Fetch user avatar
        const userResponse = await fetch(`http://` + URL + `/users/profile/${productData.productor_info.id}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await userResponse.json();
        setUserAvatar(userData.data.avatar);
      } catch (error) {
      }
    };
    const isFavourite = async () => {
      try {
          const tipo = userType().toLowerCase() + 's';
          const response = await isUserFavourite(userId(), "products", tipo, id);
          setIsFavourite(response.data.some(obj => obj.id === id));
      } catch (error) {
          console.error("Failed to check if user is favourite:", error);
      }
    }
    fetchProductDetails();
    isFavourite();
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
      const response = await addFavourite(user, 'products', typeUser, product.id);
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error('Failed to add favourite:', error);
    }
  };

  const handleRemoveFavourite = async () => {
    try {
      const typeUser = userType().toLowerCase() + 's';
      const response = await removeFavourite(user, 'products', typeUser, product.id);
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error('Failed to remove favourite:', error);
    }
  };
    

  const addtoCart = async () => {
    addToCart(product.id, product.name, product.price, count, product.productor_info.id, product.productor_info.username, product.productor_info.avatar);
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack ref={cartIconRef} />
      <ScrollView>
        {product && (
          <>
            <SafeAreaView style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={styles.quantityPill}>
                  <Text style={styles.quantityPillText}>{product.quantity} kg {getPalabra("in_stock")}</Text>
                </View>
              </View>

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

                {userType() !== "Productor" && (<View style={styles.button_row}>
                  <TouchableOpacity style={styles.button} onPress={addtoCart}>
                    <Text style={styles.button_text}>Afegir {count} a la cistella</Text>
                  </TouchableOpacity>
                </View>)}

                <View style={styles.button_bottom_row}>
                  {user !== product.productor_info.id && (
                    <OpenChat onPress={handleOpenChatPress} />
                  )}
                  {!isFavourite && (
                    <TouchableOpacity style={styles.buttonLove} onPress={handleAddFavourite}>
                      <Text style={styles.button_text}>{getPalabra("Add_favorite")}</Text>
                      <Ionicons name="heart-outline" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                  )}
                  {isFavourite && (
                    <TouchableOpacity style={styles.buttonLove} onPress={handleRemoveFavourite}>
                      <Text style={styles.button_text}>{getPalabra("Remove_favorite")}</Text>
                      <Ionicons name="heart" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                  )}
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
