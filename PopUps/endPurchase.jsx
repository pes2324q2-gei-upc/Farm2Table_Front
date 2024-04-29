import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/popUpCart.style'; // Asegúrate de que esta ruta es correcta

const ConfirmModal = ({ modalVisible, setModalVisible, navigation }) => {
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
                    <Text style={styles.modalText}>Tu pedido ha sido procesado</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCart]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.buttonText}>Ir a Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonShop]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.navigate('Home'); // Cambiar a 'Mis Pedidos' cuando esté disponible
                        }}
                    >
                        <Text style={styles.buttonText}>Ir a Mis Pedidos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmModal;
