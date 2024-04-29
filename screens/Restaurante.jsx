import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity,Dimensions } from 'react-native'
import React,  {useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, URL} from '../constants/theme'


const Restaurante = ({ route }) => {
    const { item, icon } = route.params;
    const [activeButton, setActiveButton] = useState('Insignies');

    const calculateFontSize = (name) => {
        // You can adjust these values as needed
        if (name.length <= 10) {
            return 40; // Default font size
        } else if (name.length > 10 && name.length <= 15) {
            return 30; // Adjust font size for medium-length names
        } else {
            return 20; // Adjust font size for long names
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
const styles = StyleSheet.create({
    safe: {
        width: '100%',
        backgroundColor: COLORS.secondary,
        //paddingTop: SIZES.height/1,
        flex:1,
    },
    vista: {
        backgroundColor: 'brown',
        height: SIZES.height,
    },
    cabecera: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: SIZES.height/7
    },
    restaurantName: {
        fontSize: 30, // Adjust the font size as needed
        //fontWeight: 'bold', // Add additional text styles as needed
        marginLeft: 20,
        color: COLORS.primary,
        //backgroundColor: 'red',
        width: SIZES.width/100*70
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingHorizontal: SIZES.padding,
        backgroundColor: 'transparent'
    },
    button: {
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
})
export default Restaurante