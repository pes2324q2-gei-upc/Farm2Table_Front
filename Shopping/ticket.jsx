import React, {useState} from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import { COLORS } from '../constants/theme'; // Adjust the import path as needed
import HeaderHome from '../navigation/header_backHome';
import ConfirmModal from '../PopUps/endPurchase';
import AddFundsModal from '../PopUps/insufficientFunds';
import OutOfStockModal from '../PopUps/outOfStock';
import styles from '../styles/ticket.styles'; // Adjust the import path as needed

const Ticket = ({ navigation, route }) => {
    console.log(route.params);
    const { items, storeId } = route.params; // Asegúrate de que los nombres de las propiedades coincidan con los que se pasan desde la pantalla de carrito
    const storeName = "Best Store Ever"; // Este valor debería ser dinámico si tienes varios almacenes
    const storeAddress = "123 Shopping Ln, Retail City"; // Esto también debería venir de los datos del almacén
    const [modalVisible, setModalVisible] = useState(false);

    const getTotal = () => {
        return items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    };
    
    return (
        <SafeAreaView style={styles.container_green}>
            <HeaderHome />
            <ScrollView style={styles.container}>
                <ScrollView style={styles.ticket} contentContainerStyle={styles.productsListContent}>
                    <Text style={styles.storeName}>{storeName}</Text>
                    <Text style={styles.storeAddress}>{storeAddress}</Text>

                    <Text>------------------------------------------------</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.producteHeader}>Producte</Text>
                        <Text style={styles.headerText}>Quantitat</Text>
                        <Text style={styles.headerText}>Preu</Text>
                    </View>
                    <Text>------------------------------------------------</Text>
                    {items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.tableText}>{item.quantity}</Text>
                            <Text style={styles.tableText}>{item.price.toFixed(2)} €</Text>
                        </View>
                    ))}
                    <Text>------------------------------------------------</Text>
                    <View style={styles.totalContainer}>
                        <Text style={styles.total}>Total:</Text>
                        <Text style={styles.subtotal}>{getTotal()}€</Text>
                    </View>
                </ScrollView>
                <View style={styles.button_container}>
                    <TouchableOpacity style={styles.button}  onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>Finalizar Pedido</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <AddFundsModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
            <OutOfStockModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
        </SafeAreaView>
    );
};

//<ConfirmModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />

export default Ticket;
