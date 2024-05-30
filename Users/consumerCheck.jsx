import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/consultarUsuario.style';


import { useFocusEffect } from "@react-navigation/native";
import Orders from './orderedProduct';
import UserProfile from './userInfo';
import Favoritos from './Favoritos';
import Medallas from "./Medallas";
import { fetchCounterMedals, fetchMedals, fetchUserMedals } from '../api_service/ApiConsultar_Usuario';
import { getPalabra, userId } from '../informacion/User';

const ConsumerCheck = ({ navigation, userData }) => {
    const [activeTab, setActiveTab] = useState('Pedidos');
    const [dataUser, setUserData] = useState(userData);
    const [medals, setMedals] = useState([]);
    const [userMedals, setUserMedals]  = useState([]);
    const [counter, setcounter] = useState([]);

    const onPress = (tabName) => {
        setActiveTab(tabName);
    };

    useFocusEffect(
        useCallback(() => {
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
            <View style={styles.buttonContainer}>
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

                <TouchableOpacity
                style={[styles.button, { borderColor: activeTab === 'Medallas' ? 'orange' : '#1e4d2b' }]}
                onPress={() => onPress('Medallas')}
                >
                    <Text style={[styles.buttonText, { color: activeTab === 'Medallas' ? 'orange' : 'white' }]}>
                        {getPalabra("medals")}
                    </Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'Pedidos' && (
                <View style={styles.tabContent}>
                    <Orders navigation={navigation} iD={userId()} tipus={'consumidor'} />
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
                    <Favoritos userId={userData.id} userType="Consumers" navigation={navigation} />
                </View>
            )}
             {activeTab === 'Medallas' && (
                <View style={styles.tabContent}>
                    <Medallas medals={medals} userMedals={userMedals} counter={counter} tipus={"minorista"}/>
                </View>
            )}
        </View>
    );
};

export default ConsumerCheck;
