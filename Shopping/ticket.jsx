import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme'; // Adjust the import path as needed

const OrderSummaryScreen = ({ navigation }) => {
    // Example data, replace with real data as needed
    const storeName = "Best Store Ever";
    const storeAddress = "123 Shopping Ln, Retail City";
    const cartItems = [
        { id: 1, name: "Product 1", quantity: 2, price: 10.00 },
        { id: 2, name: "Product 2", quantity: 1, price: 15.00 },
        { id: 3, name: "Product 3", quantity: 3, price: 5.00 }
    ];

    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.ticket}>
                <Text style={styles.storeName}>{storeName}</Text>
                <Text style={styles.storeAddress}>{storeAddress}</Text>

                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Product Name</Text>
                    <Text style={styles.headerText}>Quantity</Text>
                    <Text style={styles.headerText}>Price</Text>
                </View>
                {cartItems.map((item) => (
                    <View key={item.id} style={styles.tableRow}>
                        <Text style={styles.tableText}>{item.name}</Text>
                        <Text style={styles.tableText}>{item.quantity}</Text>
                        <Text style={styles.tableText}>{item.price.toFixed(2)} €</Text>
                    </View>
                ))}
                <Text style={styles.total}>Total: {getTotal()} €</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    ticket: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    storeName: {
        fontSize: 20,
        fontFamily: 'Ticketing', // Ensure this font is correctly linked in your React Native project
        textAlign: 'center'
    },
    storeAddress: {
        fontSize: 16,
        fontFamily: 'Ticketing',
        textAlign: 'center',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    tableText: {
        fontSize: 16,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default OrderSummaryScreen;
