import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

import { userId, userType } from "../informacion/User";

const ProductList = ({ navigation, shopData, idUser, typeUser }) => {

    const handlePress = (id) => {
        console.log("ProductList handlePress:", id);
        if (typeUser === "Productor" && userId() === idUser) {
            navigation.navigate("EditProduct", { productId: id });
        } else {
            navigation.navigate("ProductDetails", { id: id });
        }
    }

    return (
        <FlatList
            data={shopData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.lista}>
                    <TouchableOpacity onPress={() => handlePress(item.product.id)}>
                        <View style={styles.capsule}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>{item.price} €/kg</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    lista: {
        marginVertical: 10,
        alignItems: 'center',
    },
    capsule: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        alignItems: 'center',
        width: SIZES.width * 0.9, // adjust the width as needed
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
});

export default ProductList;
