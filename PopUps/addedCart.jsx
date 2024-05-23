import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/popUpCart.style';
import { getPalabra } from "../informacion/User"

const CartPopUp = ({ isVisible, onContinueShopping, onGoToCart }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onContinueShopping}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{getPalabra("added_to_cart")}</Text>
          <TouchableOpacity style={[styles.button, styles.buttonShop]} onPress={onContinueShopping}>
            <Text style={styles.buttonText}>{getPalabra("keep_shopping")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonCart]} onPress={onGoToCart}>
            <Text style={styles.buttonText}>{getPalabra("go_to_cart")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CartPopUp;
