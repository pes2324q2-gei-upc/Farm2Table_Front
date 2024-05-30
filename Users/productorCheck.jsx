import React, {useState, useCallback} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getPalabra } from "../informacion/User";

import styles from "../styles/consultarUsuario.style";
import { fetchData, fetchProductorComments, fetchCounterMedals, fetchMedals, fetchUserMedals } from '../api_service/ApiConsultar_Usuario';

import ProductList from "./ProductList";

import Favoritos from "./Favoritos";
import UserProfile from "./userInfo";

import { getIP } from "../informacion/Constants";
import { userId } from "../informacion/User";
import ValoracionsComponent from '../Restaurants/ValoracionsComponent';
import Medallas from "./Medallas";
import Orders from './orderedProduct';


const API_URL = "http://" +getIP();



const ProductorCheck = ({ navigation, userData, id }) => {
    const [activeTab, setActiveTab] = useState('Productos');
    const [shopData, setShopData] = useState([]);
    const [activeUser, setActiveUser] = useState(userId());
    const [comments, setComments] = useState([]);
    const [medals, setMedals] = useState([]);
    const [userMedals, setUserMedals]  = useState([]);
    const [counter, setcounter] = useState([]);
    const onPress = (tabName) => {
        setActiveTab(tabName);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData(API_URL + "/users/productor/" + id + "/products")
                .then(data => {
                    setShopData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
                fetchProductorComments(id,"productor")
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
                console.log(userMedals);
                console.log(id);
        }, [userData])
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

                <TouchableOpacity
                    style={[styles.button, { borderColor: activeTab === 'Valoraciones' ? 'orange' : '#1e4d2b' }]}
                    onPress={() => onPress('Valoraciones')}
                >
                    <Text style={[styles.buttonText, { color: activeTab === 'Valoraciones' ? 'orange' : 'white' }]}>
                        {getPalabra("valorations")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.button, { borderColor: activeTab === 'Medallas' ? 'orange' : '#1e4d2b' }]}
                onPress={() => onPress('Medallas')}
                >
                    <Text style={[styles.buttonText, { color: activeTab === 'Medallas' ? 'orange' : 'white' }]}>
                        {getPalabra("medals")}
                    </Text>
                </TouchableOpacity>
                
                {userId() === id && (
                    <TouchableOpacity
                        style={[styles.button, { borderColor: activeTab === 'Pedidos' ? 'orange' : '#1e4d2b' }]}
                        onPress={() => onPress('Pedidos')}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Pedidos' ? 'orange' : 'white' }]}>
                            {getPalabra("my_orders")}
                        </Text>
                    </TouchableOpacity>
                )}

                </ScrollView>
            </View>

            {activeTab === 'Productos' && (
                <View style={styles.tabContent}>
                    <ProductList navigation={navigation} shopData={shopData} idUser={id} typeUser="Productor" />
                </View>
            )}

            {activeTab === 'Datos' && (
                <View style={styles.tabContent}>
                    <UserProfile
                        navigation={navigation}
                        idUser={id}
                    />
                </View>
            )}

            {activeTab === 'Favoritos' && (
                <View style={styles.tabContent}>
                    <Favoritos userId={id} userType="Productors" navigation={navigation} />
                </View>
            )}

            {activeTab === 'Valoraciones' && (
                <View style={styles.tabContent}>
                    <ValoracionsComponent comments={comments} />
                </View>
            )}

            {activeTab === 'Medallas' && (
                <View style={styles.tabContent}>
                    <Medallas medals={medals} userMedals={userMedals} counter={counter} tipus={"productor"}/>
                </View>
            )}
            {userId() === id && activeTab === 'Pedidos' && (
                <View style={styles.tabContent}>
                    <Orders navigation={navigation} iD={id} tipus={'productor'} />
                </View>
            )}
        </View>
    );
}

export default ProductorCheck;