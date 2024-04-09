import React, {useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList, RefreshControl} from 'react-native';
import {COLORS, SIZES, URL} from "../constants/theme";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Foundation } from '@expo/vector-icons';
import ShopFeed from '../Products/ShopFeed';
import ProductDetails from './ProductDetails';
import EditarPerfil from './EditarPerfil';
import SliderProducts from '../Products/SliderProducts';
import { head } from 'lodash';

const API_ENDPOINT = "http://"+URL+"/users/productor/";

const Consultar_Usuario = () => {
    const [activeButton, setActiveButton] = useState('Productes');
    const [shopData, setShopData] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();

    // Extract item from route params
    const { item } = route.params;
    useEffect(() => {
        //console.log(API_ENDPOINT+item.id+"/products");
        fetchData(API_ENDPOINT+item.id+"/products");
    }, []);
    const fetchData = async(url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            //console.log(API_ENDPOINT)
            if(json.results = null) console.log("hola")

            setShopData(json.data);
            //console.log(shopData)
            /*
            shopData.forEach(item => {
                console.log(item);
            });
            ^*/
                
        }catch (error) {
            setError(error);
            console.log(error);
        }
    };
    const onPress = (buttonName) => {
        if(buttonName !== activeButton) {
            setActiveButton(buttonName === activeButton ? '' : buttonName);
        }
    }

    const goToEditarPerfil = () => {
        navigation.navigate('EditarPerfil', {item});
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
                                            {/** <Text>Hola</Text>*/}
                                        </View>
                                        {/*<Image source = {{uri: item.image}} style={styles.image} />*/}
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
        paddingTop: (SIZES.height/100) * 8, // Apply padding at the top
    },
    container2: {
        height: (SIZES.height/100)*64.5,
        backgroundColor: COLORS.primary,
        width:'100%',
    },
    buttonContainer: {
        flexDirection: 'row', // Aligns items horizontally
        justifyContent: 'space-between', // Distributes items evenly along the main axis
        paddingHorizontal: SIZES.padding, // Apply horizontal padding
        backgroundColor: 'transparent'
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
        flexDirection: 'row', // Aligns icon and text horizontally
        alignItems: 'center', // Vertically centers the icon
    },
    locationText: {
        color: 'white',
        fontSize:  (SIZES.height/100) * 2, // Adjust the font size as needed
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
        //backgroundColor:'blue'
    },
    image: {
        width: '100%', // adjust as needed
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
        //backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between', // Aligns text elements to the left and right sides
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
        color: COLORS.secondary, // Aligns text to the right side
        paddingHorizontal: 10
    },
    vista_imagen: {
        width: '100%', // adjust as needed
        height: '75%',
       // backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Consultar_Usuario;
