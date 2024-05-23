import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity,Dimensions } from 'react-native'
import React,  {useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, URL} from '../constants/theme'
import styles from '../styles/restaurante.style'

const Restaurante = ({ route }) => {
    const { item, icon } = route.params;
    const [activeButton, setActiveButton] = useState('Insignies');

    const calculateFontSize = (name) => {
       
        if (name.length <= 10) {
            return 40; 
        } else if (name.length > 10 && name.length <= 15) {
            return 30; 
        } else {
            return 20; 
        }
    };

    const onPress = (buttonName) => {
        if(buttonName !== activeButton) {
            setActiveButton(buttonName === activeButton ? '' : buttonName);
        }
    }

    const isButtonActive = (buttonName) => {
        return buttonName === activeButton;
    }
    const buttonWidth = Dimensions.get('window').width / 2;

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.cabecera}>
                {React.cloneElement(icon, { size: 80, style: { marginLeft: 20, color:COLORS.primary }})}
                <Text style={[styles.restaurantName, { fontSize: calculateFontSize(item.name) }]}>
                    {item.name}
                </Text>
                {/* Display the restaurant icon */}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Proximitat') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Proximitat')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Proximitat') ? 'orange' : 'white' }]}>Proximitat</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Insignies') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Insignies')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Insignies') ? 'orange' : 'white' }]}>Insignies</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.vista}>
                
            </View>
        </SafeAreaView>
    );  

}
export default Restaurante