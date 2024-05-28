import React, {useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList, RefreshControl} from 'react-native';
import {COLORS, SIZES, URL} from "../constants/theme";
import { AntDesign} from '@expo/vector-icons';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Foundation } from '@expo/vector-icons';
import { fetchData } from '../api_service/ApiConsultar_Usuario';
import { userId, email } from '../informacion/User';
const API_ENDPOINT = "http://"+URL+"/users/productor/";

const Consultar_Usuario = () => {
    const [activeButton, setActiveButton] = useState('Productes');
    const [shopData, setShopData] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();

    const { item } = route.params;
    useFocusEffect(
        useCallback(() => {
            fetchData(API_ENDPOINT + item.id + "/products")
                .then(data => {
                    setShopData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            const v = userId();
        }, [item])
    );

    const onPress = (buttonName) => {
        if(buttonName !== activeButton) {
            setActiveButton(buttonName === activeButton ? '' : buttonName);
        }
    }

    const goToEditarPerfil = () => {
        const v = userId();
        if(v === item.id) {
            navigation.navigate('EditarPerfil', {item});
        }
    };
    
    const isButtonActive = (buttonName) => {
        return buttonName === activeButton;
    }
    
    const buttonWidth = Dimensions.get('window').width / 3;

    return (
        <View style={styles.container}>
            <View style = {styles.infoContainer}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: item.avatar }} 
                        style={styles.image_profile}
                    />
                </View>
                <View style={styles.info}>
                    <Text style= {styles.nombre}>{item.username}</Text>
                    <View style={styles.locationInfo}>
                        <Foundation name="telephone" size={24} color="white" />
                        <Text style={styles.locationText}>{" "+ item.telephone}</Text>
                    </View>
                </View>
                <View style={styles.ajustes}>
                    <AntDesign name = "setting" size= {(SIZES.width/100)*10} color = "white" onPress={goToEditarPerfil} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Productes') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Productes')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Productes') ? 'orange' : 'white' }]}>Productes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Ubicació') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Ubicació')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Ubicació') ? 'orange' : 'white' }]}>Ubicació</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { width: buttonWidth, borderColor: isButtonActive('Sobre mí') ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Sobre mí')}
                >
                    <Text style={[styles.buttonText, { color: isButtonActive('Sobre mí') ? 'orange' : 'white' }]}>Sobre mí</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container2}>
                {isButtonActive('Productes') && (
                        <FlatList   
                            data={shopData}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (     
                                <View style={styles.lista}>
                                    <TouchableOpacity>
                                    <View style={styles.capsule}>
                                        <View style={styles.vista_imagen}>
                                            <Image source = {{uri: item.image}} style={styles.image} />
                                        </View>
                                        <View style={styles.infoProducto}>
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Text style={styles.productPrice}>{item.price} €/kg</Text>
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                )}
                {isButtonActive('Sobre mí') && (
                    <View>
                        <Text>{item.about_me}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        flex: 1, 
        paddingTop: (SIZES.height/100) * 8, 
    },
    container2: {
        height: (SIZES.height/100)*64.5,
        backgroundColor: COLORS.primary,
        width:'100%',
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
    imageContainer: {
        width: 110, 
        height: 110,
        borderRadius: 75,
        overflow: 'hidden', 
        borderWidth: 5, 
        borderColor: COLORS.tertiary, 
        position: 'absolute',
        top: (SIZES.height/100) * 0,
        left:(SIZES.width/100) * 5,
    },
    image_profile: {
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
        flexDirection: 'row',
        alignItems: 'center', 
    },
    locationText: {
        color: 'white',
        fontSize:  (SIZES.height/100) * 2, 
        marginLeft: 1,
    },
    width:{
        width: SIZES.width - 20,
    },
    lista:{
        marginTop: 12,
        width:(SIZES.width/100)*100,
        height: (SIZES.height/100)*20,  
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%', 
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute', 
    },
    capsule: {
        maxWidth: '75%',
        maxHeight: '95%',
        justifyContent: 'center',
        borderColor: COLORS.secondary,
        borderWidth: 3,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
    },
    infoProducto: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
        paddingHorizontal: 10
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: COLORS.secondary, 
        paddingHorizontal: 10
    },
    vista_imagen: {
        width: '100%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Consultar_Usuario;
