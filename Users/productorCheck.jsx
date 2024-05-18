import React, {useState, useCallback} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getPalabra } from "../informacion/User";

import styles from "../styles/consultarUsuario.style";
import { fetchData } from '../api_service/ApiConsultar_Usuario';

import ProductList from "./ProductList";

import Favoritos from "./Favoritos";
import UserProfile from "./userInfo";

import { getIP } from "../informacion/Constants";


const API_URL = `http://${getIP()}`;



const ProductorCheck = ({ navigation, userData }) => {
    const [activeTab, setActiveTab] = useState('Productos');
    const [shopData, setShopData] = useState([]);

    const onPress = (tabName) => {
        setActiveTab(tabName);
    };

    useFocusEffect(
        useCallback(() => {
            console.log("llega a consultar");
            console.log(API_URL + "/users/productor/" + userData.id + "/products");
            fetchData(API_URL + "/users/productor/" + userData.id + "/products")
                .then(data => {
                    setShopData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, [userData])
    );



    return (
        <View style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { borderColor: activeTab === 'Productos' ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Productos')}
                >
                    <Text style={[styles.buttonText, { color: activeTab === 'Productos' ? 'orange' : 'white' }]}>
                        {getPalabra("my_products")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { borderColor: activeTab === 'Datos' ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Datos')}
                >
                    <Text style={[styles.buttonText, { color: activeTab === 'Datos' ? 'orange' : 'white' }]}>
                        {getPalabra("my_data")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { borderColor: activeTab === 'Favoritos' ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Favoritos')}
                >
                    <Text style={[styles.buttonText, { color: activeTab === 'Favoritos' ? 'orange' : 'white' }]}>
                        {getPalabra("my_favs")}
                    </Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'Productos' && (
                <View style={styles.tabContent}>
                    <ProductList navigation={navigation} shopData={shopData} />
                </View>
            )}

            {activeTab === 'Datos' && (
                <View style={styles.tabContent}>
                    <UserProfile
                        username={userData.username}
                        telephone={userData.telephone}
                        avatar={userData.avatar}
                        description={userData.description}
                        reach={userData.reach}
                        user={userData}
                        navigation={navigation}
                    />
                </View>
            )}

            {activeTab === 'Favoritos' && (
                <View style={styles.tabContent}>
                    <Favoritos userId={userData.id} userType="Productor" navigation={navigation} />
                </View>
            )}
        </View>
    );
}

export default ProductorCheck;