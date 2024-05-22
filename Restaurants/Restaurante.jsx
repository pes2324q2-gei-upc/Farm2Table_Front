import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity,Dimensions } from 'react-native'
import React, {useState, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, URL} from '../constants/theme'
import styles from '../styles/restaurante.style'
import { fetchUserComments } from '../api_service/ApiRestaurant';
import ValoracionsComponent from './ValoracionsComponent';
import { useNavigation } from '@react-navigation/native';
import Valorar from './Valorar';
const Restaurante = ({ route }) => {
    const { item, icon } = route.params;
    const [activeButton, setActiveButton] = useState('Valoracions');
    const [comments, setComments] = useState([]);
    const navigation = useNavigation();
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
    const buttonWidth = Dimensions.get('window').width / 3;
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await fetchUserComments(item.id);
                setComments(data); 
                //console.log("hola");
                //console.log(comments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [item.id]);

    const renderContent = () => {
        switch (activeButton) {
            case 'Proximitat':
                return <Text>HOLA</Text>;
            case 'Insignies':
                return <Text>HOLA</Text>;
            case 'Valoracions':
                return <ValoracionsComponent comments={comments} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.cabecera}>
                {React.cloneElement(icon, { size: 80, style: { marginLeft: 20, color:COLORS.primary }})}
                <Text style={[styles.restaurantName, { fontSize: calculateFontSize(item.service_name) }]}>
                    {item.service_name}
                </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Valorar",  { restaurantId: item.id, nomRestaurant: item.service_name, tipus:"minorista" })}><Text>Valora</Text></TouchableOpacity>
                
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

                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Valoracions') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Valoracions')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Valoracions') ? 'orange' : 'white' }]}>Valoracions</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.vista}>
                {renderContent()}
            </View>
        </SafeAreaView>
    );  

}
export default Restaurante