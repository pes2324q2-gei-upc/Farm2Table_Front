import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { Ionicons } from '@expo/vector-icons';

const ProductorMinoristaItem = ({ navigation, name, username, type, id }) => {

    const handlePress = () => {
            navigation.navigate("CheckUser", { idUser: id, typeUser: type });
    };


    return (
        <TouchableOpacity onPress={handlePress}>
                <View style={styles.itemContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.username}>{username}</Text>
                    <View style={styles.separator} />
                </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginBottom: 10,
        width: SIZES.width - 30,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
    },
    username: {
        fontSize: 16,
        color: COLORS.text,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.tertiary,
        marginTop: 10,
    },
});

export default ProductorMinoristaItem;
