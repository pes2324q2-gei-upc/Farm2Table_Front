import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const QuantitySelector = ({ count, increment, decrement }) => {
  return (
    <View style={styles.rating_row}>
      <TouchableOpacity style={styles.quantity_button} onPress={decrement}>
        <Ionicons name="remove" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.quantity}>{count}</Text>
      <TouchableOpacity style={styles.quantity_button} onPress={increment}>
        <Ionicons name="add" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
    rating_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", // Vertically align the items
        textAlignVertical: "center",
        width: 90,
      },
    
      quantity: {
        fontFamily: "regular",
        fontSize: SIZES.large,
      },
    
      quantity_button: {
        backgroundColor: COLORS.highlighter,
        borderRadius: 10,
        padding: 5,
      },
};

export default QuantitySelector;
