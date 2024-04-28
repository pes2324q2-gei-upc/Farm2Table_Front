import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/popUpCart.style';

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
          <Text style={styles.modalText}>Producte afegit a la cistella!</Text>
          <TouchableOpacity style={[styles.button, styles.buttonShop]} onPress={onContinueShopping}>
            <Text style={styles.buttonText}>Continuar Comprant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonCart]} onPress={onGoToCart}>
            <Text style={styles.buttonText}>Anar a la cistella</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CartPopUp;
