import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/popUpCart.style'; // Make sure the path is correct
import { COLORS } from '../constants/theme'; // Make sure the path is correct

const AddFundsModal = ({ modalVisible, setModalVisible, navigation }) => {
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
                        color={COLORS.error} // Assume you have an error color defined
                        style={{ marginBottom: 20 }}
                    />
                    <Text style={styles.modalText}>Fondos insuficientes</Text>
                    <Text style={styles.modalText}>
                        Por favor, añade más fondos para continuar con tu pedido.
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCart]}
                        onPress={() => {
                            // Logic to navigate to the Add Funds Screen
                            setModalVisible(!modalVisible);
                            navigation.navigate('AddCoinsScreen');
                        }}
                    >
                        <Text style={styles.buttonText}>Añadir Fondos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonBack]}
                        onPress={() => {
                            // Logic to navigate to the Add Funds Screen
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.buttonTextBlack}>Atrás</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AddFundsModal;
