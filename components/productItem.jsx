import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const ProductItem = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => { /* Perform no action yet */ }}>
            <View style={styles.capsule}>
                <View style={styles.vista_imagen}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.infoProducto}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price} €/kg</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    capsule: {
        flexDirection: "row",
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
    vista_imagen: {
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoProducto: {
        flex: 3,
        justifyContent: "center",
        paddingLeft: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
    },
    productPrice: {
        fontSize: 16,
        color: COLORS.text,
    },
});

export default ProductItem;
