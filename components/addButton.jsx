import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const AddButton = ({ onPress }) => {


    
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 50, // Adjusted for the footer height
        right: 20,
        backgroundColor: COLORS.tertiary,
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        // Remove verticalAlign, not supported in React Native
    },
    text: {
        color: 'white',
        fontSize: 54,
        fontWeight: 'bold',
        lineHeight: 60, // Adjust line height to center vertically
    },
});

export default AddButton;
