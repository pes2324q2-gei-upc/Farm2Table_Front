import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/popUpCart.style'; // Asegúrate de que esta ruta es correcta
import { getPalabra } from '../informacion/User';
import { userId, userType } from '../informacion/User';


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
                    <Text style={styles.modalText}>{getPalabra("processed_purchase")}</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCart]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.buttonText}>{getPalabra("go_home")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonShop]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.navigate('CheckUser', { idUser: userId(), typeUser: userType() }); // Cambiar a 'Mis Pedidos' cuando esté disponible
                        }}
                    >
                        <Text style={styles.buttonText}>{getPalabra("go_orders")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmModal;
