import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const OrderTab = ({ productorName, orderDate, onPress }) => {
    const formattedDate = new Date(orderDate).toLocaleDateString();
    const formattedTime = new Date(orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.infoContainer}>
                <Text style={styles.productorName}>{productorName}</Text>
                <Text style={styles.orderDate}>{`${formattedDate} ${formattedTime}`}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: COLORS.secondary,
        borderBottomWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
        width: '100%',
        marginVertical: 5,
    },
    infoContainer: {
        flexDirection: 'column',
    },
    productorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    orderDate: {
        fontSize: 14,
        color: COLORS.primary,
    },
});

export default OrderTab;
