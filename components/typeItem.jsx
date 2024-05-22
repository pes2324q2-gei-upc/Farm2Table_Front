import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const TypeItem = ({ type }) => {
    return (
        <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{type}</Text>
            <View style={styles.separator} />
        </View>
    );
};

const styles = StyleSheet.create({
    typeContainer: {
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginBottom: 10,
        width: SIZES.width - 60,
    },
    typeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.tertiary,
        marginTop: 10,
    },
});

export default TypeItem;
