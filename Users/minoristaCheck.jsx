import React, {useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getPalabra } from "../informacion/User";

import styles from "../styles/consultarUsuario.style";
import { fetchUserBoughtProducts } from '../api_service/APIOrders';

import ProductList from "./ProductList";

import Favoritos from "./Favoritos";
import Orders from "./orderedProduct";
import UserProfile from "./userInfo";

import { getIP } from "../informacion/Constants";
import { userId } from "../informacion/User";


const API_URL = `http://${getIP()}`;



const MinoristaCheck = ({ navigation, userData }) => {
    const [activeTab, setActiveTab] = useState('Pedidos');
    const [shopData, setShopData] = useState([]);
    const [activeUser, setActiveUser] = useState(userId());


    const onPress = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        const productsLoad = async () => {
            try {
                const data = await fetchUserBoughtProducts(userData.id);
                console.log(data);
                setShopData(data);
            } catch (error) {
                console.error("Failed to fetch products: ", error);
            }
        }
        productsLoad();
    }, [userData.id]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <ScrollView 
                    contentContainerStyle={styles.buttonContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity
                        style={[styles.button, { borderColor: activeTab === 'Productos' ? 'orange' : '#1e4d2b' }]}
                        onPress={() => onPress('Productos')}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Productos' ? 'orange' : 'white' }]}>
                            {getPalabra("Products")}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { borderColor: activeTab === 'Pedidos' ? 'orange' : '#1e4d2b' }]}
                        onPress={() => onPress('Pedidos')}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Pedidos' ? 'orange' : 'white' }]}>
                            {getPalabra("my_orders")}
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
                </ScrollView>
            </View>

            {activeTab === 'Productos' && (
                <View style={styles.tabContent}>
                    <ProductList navigation={navigation} shopData={shopData} />
                </View>
            )}

            {activeTab === 'Pedidos' && userData.id === activeUser && (
                <View style={styles.tabContent}>
                    <Orders navigation={navigation} />
                </View>
            )}

            {activeTab === 'Datos'  && (
                <View style={styles.tabContent}>
                    <UserProfile
                        navigation={navigation}
                        idUser={userData.id}
                    />
                </View>
            )}

            {activeTab === 'Favoritos' && (
                <View style={styles.tabContent}>
                    <Favoritos userId={userData.id} userType="Minoristas" navigation={navigation} />
                </View>
            )}
        </View>
    );
}

export default MinoristaCheck;