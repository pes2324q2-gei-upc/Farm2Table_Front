import React, {useState, useCallback} from "react";
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
import { fetchCounterMedals, fetchMedals, fetchProductorComments, fetchUserMedals } from "../api_service/ApiConsultar_Usuario";
import ValoracionsComponent from "../Restaurants/ValoracionsComponent";
import Medallas from "./Medallas";
import { count } from "firebase/firestore";
const API_URL = `http://${getIP()}`;



const MinoristaCheck = ({ navigation, userData, id }) => {
    const [activeTab, setActiveTab] = useState('Datos');
    const [shopData, setShopData] = useState([]);
    const [activeUser, setActiveUser] = useState(userId());
    const [comments, setComments] = useState([]);
    const [medals, setMedals] = useState([]);
    const [userMedals, setUserMedals]  = useState([]);
    const [counter, setcounter] = useState([]);
    
    const onPress = (tabName) => {
        setActiveTab(tabName);
    };


    const handleProducts = async () => {
        try {
            const data = await fetchUserBoughtProducts(userData.id);
            setShopData(data);
            onPress('Productos');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
                fetchProductorComments(id,"minorista")
                .then(data => {
                    setComments(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
                fetchMedals()
                .then(data => {
                    setMedals(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
                fetchCounterMedals(id)
                .then(data => {
                    setcounter(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
                fetchUserMedals(id)
                .then(data => {
                    setUserMedals(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, [])
    );

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
                        onPress={handleProducts}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Productos' ? 'orange' : 'white' }]}>
                            {getPalabra("Products")}
                        </Text>
                    </TouchableOpacity>

                    {activeUser === userData.id && (<TouchableOpacity
                        style={[styles.button, { borderColor: activeTab === 'Pedidos' ? 'orange' : '#1e4d2b' }]}
                        onPress={() => onPress('Pedidos')}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Pedidos' ? 'orange' : 'white' }]}>
                            {getPalabra("my_orders")}
                        </Text>
                    </TouchableOpacity>
)}
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

                    <TouchableOpacity
                    style={[styles.button, { borderColor: activeTab === 'Valoraciones' ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Valoraciones')}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Valoraciones' ? 'orange' : 'white' }]}>
                            Valoraciones
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[styles.button, { borderColor: activeTab === 'Medallas' ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Medallas')}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Medallas' ? 'orange' : 'white' }]}>
                            Medallas
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

            {activeTab === 'Productos' && (
                <View style={styles.tabContent}>
                    <ProductList navigation={navigation} shopData={shopData} idUser={id}  typeUser="Minorista" />
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

            {activeTab === 'Valoraciones' && (
                <View style={styles.tabContent}>
                    <ValoracionsComponent comments={comments} />
                </View>
            )}

            {activeTab === 'Medallas' && (
                <View style={styles.tabContent}>
                    <Medallas medals={medals} userMedals={userMedals} counter={counter} tipus={"minorista"}/>
                </View>
            )}
        </View>
    );
}

export default MinoristaCheck;