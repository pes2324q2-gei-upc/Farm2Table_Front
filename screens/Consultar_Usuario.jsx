import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import {COLORS, SIZES} from "../constants/theme";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';

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
            <View style = {styles.infoContainer}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('./descarga.jpg')} 
                        style={styles.image}
                    />
                </View>
                <View style={styles.info}>
                    <Text style= {styles.nombre}> Fernando Alonso</Text>
                    <View style={styles.locationInfo}>
                        <MaterialIcons name="location-pin" size={(SIZES.width/100)*8} color="white" />
                        <Text style={styles.locationText}> Ubicació: Madrid</Text>
                    </View>
                </View>
                <View style={styles.ajustes}>
                    <AntDesign name = "setting" size= {(SIZES.width/100)*10} color = "white" />
                </View>
            </View>
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
        paddingTop: (SIZES.height/100) * 8, // Apply padding at the top
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
    imageContainer: {
        width: 110,  // Adjust size as needed
        height: 110, // Adjust size as needed
        borderRadius: 75, // Half of the width or height to make it circular
        overflow: 'hidden', // Clip child components to the rounded border
        borderWidth: 5, // Border width
        borderColor: COLORS.tertiary, // Border color
        position: 'absolute',
        top: (SIZES.height/100) * 0,
        left:(SIZES.width/100) * 5,
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: (SIZES.height/100) * 14,
      },
      info: {
        position: 'absolute',
        right: 20,
        width: '60%',
        height: '100%',
        backgroundColor: 'transparent',
      },
      ajustes: {
        position: 'absolute',
        right:(SIZES.width/100) * 7,
        top: (SIZES.height/100) * -1,
        width: '10%',
        height: '35%',
        backgroundColor: 'transparent',
      },
      nombre: {
        color: 'white',
        fontSize:  (SIZES.height/100) * 2,
        fontWeight: 'bold',
        paddingBottom:  (SIZES.height/100) * 1,
      },
      locationInfo: {
        flexDirection: 'row', // Aligns icon and text horizontally
        alignItems: 'center', // Vertically centers the icon
      },
      locationText: {
        color: 'white',
        fontSize:  (SIZES.height/100) * 2, // Adjust the font size as needed
        marginLeft: 1,
      },
});

export default Consultar_Usuario;
