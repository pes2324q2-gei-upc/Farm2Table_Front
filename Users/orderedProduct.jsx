import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import styles from "../styles/consultarUsuario.style";
import { userId } from "../informacion/User";
import { COLORS } from "../constants/theme";
import { fetchUserOrders, fetchProductsSold } from "../api_service/APIOrders";
import OrderTab from "./orderTab";

const Orders = ({ navigation, iD, tipus }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            const user = tipus === 'consumidor' ? userId() : iD;
            try {
                const data = tipus === 'consumidor' ? await fetchUserOrders(user) : await fetchProductsSold(user);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch orders: ", error);
            }
        };
        loadOrders();
    }, [tipus, iD]);

    const onPressOrder = (orderGroup) => {
        const items = orderGroup.map(order => ({
            name: order.product.description,
            quantity: order.quantity,
            price: order.product.price,
            productId: order.product.type.id
        }));

        let storeName;
        if (tipus === 'consumidor') {
            // Si es un consumidor, usa el nombre del productor
            storeName = orderGroup[0].seller.productor_name;
        } else {
            // Si es un productor, usa el nombre de usuario
            storeName = orderGroup[0].buyer.username;
        }

        const orderDetails = {
            items,
            storeName, // Aquí se asigna el valor dinámicamente
        };

        navigation.navigate('OrderSummary', orderDetails);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container_green}>
                <Text style={{ color: 'white', fontSize: 20 }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.primary, padding: 20 }}>
            {Object.keys(orders).map((seller, index) => (
                orders[seller].map((orderGroup, groupIndex) => {
                    let orderDate;
                    if (tipus === 'consumidor') {
                        // Si es un consumidor, usa la fecha de compra
                        orderDate = orderGroup[0].bought_at;
                    } else {
                        // Si es un productor, usa la fecha de venta (o cualquier otra fecha relevante)
                        orderDate = orderGroup[0].sold_at; // Por ejemplo, suponiendo que haya una propiedad 'sold_at'
                    }
        
                    return (
                        <OrderTab
                            key={`${index}-${groupIndex}`}
                            productorName={seller}
                            orderDate={orderDate} // Aquí se establece dinámicamente
                            onPress={() => onPressOrder(orderGroup)}
                        />
                    );
                })
            ))}
        </ScrollView>
    );
};

export default Orders;