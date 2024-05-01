import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Header from '../navigation/header_back';
import { Ionicons } from '@expo/vector-icons';
import { fetchUser } from '../api_service/ApiConsultar_Usuario';
import { userId } from '../informacion/User';

const ProfileScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Pedidos');
    const [shopData, setUserData] = useState([]);

    useEffect(() => {
        const userLoad = async () => {
            const user = userId();
            try {
                const data = await fetchUser(user);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data: ", error);
            }
        };
        userLoad();
    });

    const onPress = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <SafeAreaView style={styles.safecontainer}>
            <Header />
            <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
                <View style={styles.profileContainer}>
                    {shopData.avatar ? (
                        <Image source={require('../assets/images/149071.png')} style={styles.avatar} />
                    ) : null}
                    <Text style={styles.usernameLarge}>{shopData.username}</Text>
                    {shopData.telephone && (
                        <View style={styles.telephoneContainer}>
                            <Ionicons name="call" size={18} color="white" />
                            <Text style={styles.telephone}>{shopData.telephone}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { borderColor: activeTab === 'Pedidos' ? 'orange' : '#1e4d2b' }]}
                        onPress={() => onPress('Pedidos')}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Pedidos' ? 'orange' : 'white' }]}>Mis Pedidos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { borderColor: activeTab === 'Datos' ? 'orange' : '#1e4d2b' }]}
                        onPress={() => onPress('Datos')}
                    >
                        <Text style={[styles.buttonText, { color: activeTab === 'Datos' ? 'orange' : 'white' }]}>Mis Datos</Text>
                    </TouchableOpacity>
                </View>

                {activeTab === 'Pedidos' && (
                    <View style={styles.tabContent}>
                        <Text style={styles.tabTitle}>Mis Pedidos</Text>
                    </View>
                )}

                {activeTab === 'Datos' && (
                    <View style={styles.tabContent}>
                        <Text style={styles.tabTitle}>Sobre Mí</Text>
                        {/* Display all the details beautifully */}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safecontainer: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: COLORS.tertiary,
    },
    usernameLarge: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 5,
    },
    username: {
        fontSize: 20,
        color: 'white',
        marginTop: 10,
    },
    telephoneContainer: {
        flexDirection: 'row',     
        justifyContent: 'center',  
        alignItems: 'center',      
        marginTop: 10,            
        marginBottom: 10,    
    },
    telephone: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    button: {
        flex: 1,  // Allows the buttons to take equal space
        alignItems: "center",
        justifyContent: 'center',
        height: 40,
        marginHorizontal: 5,
        borderBottomWidth: 2,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: SIZES.xlarge,
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
    },
    tabTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
