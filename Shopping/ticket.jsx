import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import { COLORS } from '../constants/theme'; // Adjust the import path as needed
import Header from '../navigation/header_back';

const Ticket = ({ navigation }) => {
    // Example data, replace with real data as needed
    const storeName = "Best Store Ever";
    const storeAddress = "123 Shopping Ln, Retail City";
    const cartItems = [
        { id: 1, name: "Product 1", quantity: 2, price: 10.00 },
        { id: 2, name: "Product 2", quantity: 1, price: 15.00 },
        { id: 3, name: "Product 3", quantity: 3, price: 5.00 },
        { id: 1, name: "Product 1", quantity: 2, price: 10.00 },
        { id: 2, name: "Product 2", quantity: 1, price: 15.00 },
        { id: 3, name: "Product 3", quantity: 3, price: 5.00 },
        { id: 1, name: "Product 1", quantity: 2, price: 10.00 },
        { id: 2, name: "Product 2", quantity: 1, price: 15.00 },
        { id: 3, name: "Product 3", quantity: 3, price: 5.00 },
        { id: 1, name: "Product 1", quantity: 2, price: 10.00 },
        { id: 2, name: "Product 2", quantity: 1, price: 15.00 },
        { id: 3, name: "Product 3", quantity: 3, price: 5.00 },
        { id: 1, name: "Product 1", quantity: 2, price: 10.00 },
        { id: 2, name: "Product 2", quantity: 1, price: 15.00 },
        { id: 3, name: "Product 3", quantity: 3, price: 5.00 },
    ];

    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    };

    return (
        <SafeAreaView style={styles.container_green}>
            <Header />
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
                    {cartItems.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>Seleccionar Mètode de Pagament</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    productsListContent: {
        alignItems: 'center', // Apply the alignment as necessary, 'stretch' is just an example
      },
    container_green: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    ticket: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        maxHeight: '70%'
    },
    storeName: {
        fontSize: 20,
        fontFamily: 'ticket', // Ensure this font is correctly linked in your React Native project
        textAlign: 'center'
    },
    storeAddress: {
        fontSize: 18,
        fontFamily: 'ticket',
        textAlign: 'center',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 30,
        width: '100%',

    },
    headerText: {
        fontSize: 18,
        fontFamily: 'ticket',
        fontWeight: 'bold',
        width: '30%',
        textAlign: 'right',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10, // Adjust this value if needed
        paddingRight: 20,
        width: '100%',
        marginBottom: 10,
        
    },
    tableText: {
        fontSize: 18,
        width: '30%',
        textAlign: 'right',
        paddingRight: 10,
        fontFamily: 'ticket',
    },
    total: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'ticket',
    },
    button: {
        marginTop: 10,
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    productName: {
        fontSize: 18,
        fontFamily: 'ticket',
        width: '50%', // Adjust if needed to fit
    },
    producteHeader: {
        width: '50%',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'ticket',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10, // Adjust this value to match your ticket's padding
        paddingRight: 0,
        width: '100%',
        marginTop: 5, // Adjust if you want more space above the total line
        marginBottom: 20,
    },
    subtotal: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'ticket',
    },
    button_container:{
        marginHorizontal: 20,
    }
});

export default Ticket;
