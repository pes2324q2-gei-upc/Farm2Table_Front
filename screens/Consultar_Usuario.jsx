import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {COLORS, SIZES} from "../constants/theme";
import { ScrollView } from 'react-native-gesture-handler';

const Consultar_Usuario = () => {
    const [activeButton, setActiveButton] = useState('Productes');

    const onPress = (buttonName) => {
        setActiveButton(buttonName === activeButton ? '' : buttonName);
    }
    const isButtonActive = (buttonName) => {
        return buttonName === activeButton;
    }

    const buttonWidth = Dimensions.get('window').width / 3;

    return (
        <View style={styles.container}>
            <View>
                <Text>Info de la persona Esto ciona muy bien</Text>
            </View>
            {/* Horizontal container for the buttons */}
            <View style={styles.buttonContainer}>
                {/* First TouchableOpacity */}
                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Productes') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Productes')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Productes') ? 'orange' : 'white' }]}>Productes</Text>
                </TouchableOpacity>

                {/* Second TouchableOpacity */}
                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Ubicació') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Ubicació')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Ubicació') ? 'orange' : 'white' }]}>Ubicació</Text>
                </TouchableOpacity>

                {/* Third TouchableOpacity */}
                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Sobre mí') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Sobre mí')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Sobre mí') ? 'orange' : 'white' }]}>Sobre mí</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container2}>
               
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        flex: 1, 
        paddingTop: (SIZES.height/100) * 20, // Apply padding at the top
    },
    container2: {
        flex: 1,
        paddingBottom: SIZES.height,
        backgroundColor: COLORS.primary,
    },
    buttonContainer: {
        flexDirection: 'row', // Aligns items horizontally
        justifyContent: 'space-between', // Distributes items evenly along the main axis
        paddingHorizontal: SIZES.padding // Apply horizontal padding
    },
    button: {
        //paddingVertical: 10,
        alignItems: "center",
        height: 40,
        borderBottomWidth: 2,
    },
    buttonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: SIZES.xlarge
    },
});

export default Consultar_Usuario;
