import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const ProductItem = ({ navigation, item }) => {

    const id = item.id;

    const handlePress = () => {
        navigation.navigate("ProductDetails", { id });
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.capsule}>
                <View style={styles.vista_imagen}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.infoProducto}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price} €/kg</Text>
                </View>
            </View>
            <View style={styles.separator}></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    capsule: {
        flexDirection: "row",
        height: 75,
        width: SIZES.width - 60,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 10,
    },
    vista_imagen: {
        flex: 1,
    },
    image: {
        width: 75,
        height: 50,
        borderRadius: 10,
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
    separator: {
        height: 1,
        backgroundColor: COLORS.tertiary,
        marginTop: 5,
        marginHorizontal: 10,
    },
});

export default ProductItem;
