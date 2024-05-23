import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import styles from "../styles/consultarUsuario.style";
import { userId } from "../informacion/User";
import { COLORS } from "../constants/theme";
import { fetchUserOrders } from "../api_service/APIOrders";
import OrderTab from "./orderTab";


const Orders = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            const user = userId();
            try {
                const data = await fetchUserOrders(user);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch user orders: ", error);
            }
        };
        loadOrders();
    }, []);

    const onPressOrder = (orderGroup) => {
        const items = orderGroup.map(order => ({
            name: order.product.description,
            quantity: order.quantity,
            price: order.product.price,
            productId: order.product.type.id
        }));

        const orderDetails = {
            items,
            storeName: orderGroup[0].seller.productor_name,
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
                orders[seller].map((orderGroup, groupIndex) => (
                    <OrderTab
                        key={`${index}-${groupIndex}`}
                        productorName={seller}
                        orderDate={orderGroup[0].bought_at}
                        onPress={() => onPressOrder(orderGroup)}
                    />
                ))
            ))}
        </ScrollView>
    );
}

export default Orders;
