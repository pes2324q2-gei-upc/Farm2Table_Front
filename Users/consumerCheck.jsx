import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/consultarUsuario.style';
import Orders from './orderedProduct';
import UserProfile from './userInfo';
import { getPalabra } from '../informacion/User';

const ConsumerCheck = ({ navigation, shopData }) => {
    const [activeTab, setActiveTab] = useState('Pedidos');

    const onPress = (tabName) => {
        setActiveTab(tabName);
    };

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
            </View>

            {activeTab === 'Pedidos' && (
                <View style={styles.tabContent}>
                    <Orders navigation={navigation} />
                </View>
            )}

            {activeTab === 'Datos' && (
                <View style={styles.tabContent}>
                    <UserProfile
                        username={shopData.username}
                        telephone={shopData.telephone}
                        avatar={shopData.avatar}
                        description={shopData.description}
                        reach={shopData.reach}
                        user={shopData}
                        navigation={navigation}
                    />
                </View>
            )}

            {activeTab === 'Favoritos' && (
                <View style={styles.tabContent}>
                    <Text style={styles.tabTitle}>Mis Favoritos</Text>
                </View>
            )}
        </View>
    );
};

export default ConsumerCheck;
