import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/theme';
import HeaderHome from '../navigation/header_backHome';
import styles from '../styles/ticket.styles';

import { getPalabra } from '../informacion/User';

const OrderSummary = ({ navigation, route }) => {
    const { items, storeName } = route.params;

    const getTotal = () => {
        return items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    };
    
    return (
        <SafeAreaView style={styles.container_green}>
            <HeaderHome />
            <ScrollView style={styles.container}>
                <ScrollView style={styles.ticket2} contentContainerStyle={styles.productsListContent}>
                    <Text style={styles.storeName}>{storeName}</Text>

                    <Text>------------------------------------------------</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.producteHeader}>{getPalabra('product')}</Text>
                        <Text style={styles.headerText}>{getPalabra('quantity')}</Text>
                        <Text style={styles.headerText}>{getPalabra('price')}</Text>
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderSummary;
