import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/popUpCart.style'; // Make sure the path is correct
import { COLORS } from '../constants/theme'; // Make sure the path is correct

const OutOfStockModal = ({ modalVisible, setModalVisible, navigation , productName, quantityLeft}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Ionicons
                        name='alert-circle-outline'
                        size={30}
                        color={COLORS.error} // This color is just an example, change it as needed
                        style={{ marginBottom: 20 }}
                    />
                    <Text style={styles.modalText}>Not enough stock for:</Text>
                    <Text style={styles.modalTitle}>{productName}</Text>
                    <Text style={styles.modalText}>Only {quantityLeft} left in stock.</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCart]}
                        onPress={() => {
                            navigation.navigate('CartScreen'); // Make sure the screen name is correct
                            // You can add actions here, like redirecting to the main store or updating the cart
                        }}
                    >
                        <Text style={styles.buttonText}>Modificar Pedido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default OutOfStockModal;
