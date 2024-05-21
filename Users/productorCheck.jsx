import React, {useState, useCallback, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getPalabra } from "../informacion/User";

import styles from "../styles/consultarUsuario.style";
import { fetchProducts } from '../api_service/ApiConsultar_Usuario';

import ProductList from "./ProductList";

import Favoritos from "./Favoritos";
import UserProfile from "./userInfo";

import { userId } from "../informacion/User";






const ProductorCheck = ({ navigation, userData }) => {
    const [activeTab, setActiveTab] = useState('Datos');
    const [shopData, setShopData] = useState([]);
    const [activeUser, setActiveUser] = useState(userId());
    const [productorId, setProductorId] = useState(userData.id)

    const onPress = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        const productsLoad = async () => {
            try {
                const data = await fetchProducts(productorId);
                setShopData(data);
            } catch (error) {
                console.error("Failed to fetch products: ", error);
            }
        }
        productsLoad();
    }, [productorId]);



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
                        navigation={navigation}
                        idUser={userData.id}
                    />
                </View>
            )}

            {activeTab === 'Favoritos' && (
                <View style={styles.tabContent}>
                    <Favoritos userId={userData.id} userType="Productors" navigation={navigation} />
                </View>
            )}
        </View>
    );
}

export default ProductorCheck;