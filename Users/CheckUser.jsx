import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Header from '../navigation/header_back';
import { Ionicons } from '@expo/vector-icons';
import { fetchUser } from '../api_service/ApiConsultar_Usuario';
import { userId, getPalabra, userType } from '../informacion/User';
import { addFavourite } from '../api_service/APIFavoritos';

import ConsumerCheck from './consumerCheck';
import ProductorCheck from './productorCheck';
import MinoristaCheck from './minoristaCheck';

const ProfileScreen = ({ navigation, route }) => {
    const { idUser: routeIdUser, typeUser: routeTypeUser } = route.params;

    const [userData, setUserData] = useState(null);  // Initialize as null
    const [activeUser, setActiveUser] = useState(userId());
    const [loading, setLoading] = useState(true);


    const handleAddFavourite = async () => {
        try {
          const tipo = userType().toLowerCase() + 's';
          const type = routeTypeUser.toLowerCase() + 's';
          console.log("favType", tipo, "userType", type)
          const response = await addFavourite(activeUser, type, tipo, routeIdUser);
        } catch (error) {
          console.error("Failed to add favourite:", error);
        }
      };

    useEffect(() => {
        const userLoad = async () => {
            try {
                const data = await fetchUser(routeIdUser);
                console.log(data);
                setUserData(data);
                setLoading(false);

            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setLoading(false);
            }
        };
        userLoad();
    }, [routeIdUser]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.secondary} />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safecontainer}>
            <Header />
            <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
                <View style={styles.profileContainer}>
                    {userData.avatar ? (
                        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                    ) : null}
                    <Text style={styles.usernameLarge}>{userData.username}</Text>
                    {userData.telephone && (
                        <View style={styles.telephoneContainer}>
                            <Ionicons name="call" size={18} color="white" />
                            <Text style={styles.telephone}>{userData.telephone}</Text>
                        </View>
                    )}
                    {activeUser !== routeIdUser && (
                        <TouchableOpacity style={styles.addButton} onPress={handleAddFavourite}>
                            <Text style={styles.buttonFavouriteText}>{getPalabra("Add_favorite")}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {routeTypeUser === 'Consumer' ? (
                    <ConsumerCheck navigation={navigation} userData={userData} />
                ) : routeTypeUser === 'Productor' ? (
                    <ProductorCheck navigation={navigation} userData={userData} />
                ) : routeTypeUser === 'Minorista' ? (
                    <MinoristaCheck navigation={navigation} userData={userData} />
                ) : null}
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
    addButton: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    buttonFavouriteText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
    },
});

export default ProfileScreen;
