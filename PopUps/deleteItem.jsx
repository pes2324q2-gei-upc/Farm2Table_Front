import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/popUpCart.style'; // Make sure the path is correct
import { COLORS } from '../constants/theme'; // Make sure the path is correct

const DeleteConfirmationModal = ({ modalVisible, setModalVisible, handleConfirmDelete }) => {
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
                    <Text style={styles.modalText}>¿Estás seguro de que deseas eliminar este artículo del carrito?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCart]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonDelete]}
                            onPress={() => {
                                handleConfirmDelete();
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteConfirmationModal;
