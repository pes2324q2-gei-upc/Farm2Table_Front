import React from "react";

import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import styles from "../styles/consultarUsuario.style";

const Favoritos = ({ navigation, userId }) => {
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