import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Header from '../navigation/header_back';
import { Ionicons } from '@expo/vector-icons';
import { fetchUser } from '../api_service/ApiConsultar_Usuario';
import { userId, getPalabra, userType } from '../informacion/User';
import { addFavourite, isUserFavourite, removeFavourite } from '../api_service/APIFavoritos';

import ConsumerCheck from './consumerCheck';
import ProductorCheck from './productorCheck';
import MinoristaCheck from './minoristaCheck';
import { is } from 'date-fns/locale';




const ProfileScreen = ({ navigation, route }) => {

    const { idUser, typeUser } = route.params;


    const [userData, setUserData] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);
    const activeUser = userId();

    if (typeUser === undefined) {
        console.log("buenastardes");
        typeUser = userType();
    }

    const handleAddFavourite = async () => {
        try {
          const tipo = userType().toLowerCase() + 's';
          const type = typeUser.toLowerCase() + 's';
          const routeIdUser = idUser;
          const response = await addFavourite(activeUser, type, tipo, routeIdUser);
          setIsFavourite(true);
        } catch (error) {
          console.error("Failed to add favourite:", error);
        }
    };

    const handleRemoveFavourite = async () => {
        try {
          const tipo = userType().toLowerCase() + 's';
          const type = typeUser.toLowerCase() + 's';
          const routeIdUser = idUser;
          const response = await removeFavourite(activeUser, type, tipo, routeIdUser);
            setIsFavourite(false);
        } catch (error) {
          console.error("Failed to remove favourite:", error);
        }
    }

    useEffect(() => {
        const userLoad = async () => {
            const user = idUser ? idUser : userId();
            console.log("user:" +user);
            try {
                const data = await fetchUser(user);
                setUserData(data);
                console.log("data.id:"+ data.id);
            } catch (error) {
                console.error("Failed to fetch user data: ", error);
            }
        };
        const isFavourite = async () => {
            try {
                const tipo = userType().toLowerCase() + 's';
                const type = typeUser.toLowerCase() + 's';
                const routeIdUser = idUser;
                const response = await isUserFavourite(activeUser, type, tipo, routeIdUser);
                setIsFavourite(response.data.some(obj => obj.id === routeIdUser));
            } catch (error) {
                console.error("Failed to check if user is favourite:", error);
            }
        }
        if(activeUser !== idUser) isFavourite();
        userLoad();
    }, []); 

    return (
        <SafeAreaView style={styles.safecontainer}>
            <Header />
            <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
                <View style={styles.profileContainer}>
                    {userData.avatar ? (
                        <Image source={userData.avatar} style={styles.avatar} />
                    ) : null}
                    <Text style={styles.usernameLarge}>{userData.username}</Text>
                    {userData.telephone && (
                        <View style={styles.telephoneContainer}>
                            <Ionicons name="call" size={18} color="white" />
                            <Text style={styles.telephone}>{userData.telephone}</Text>
                        </View>
                    )}
                    {activeUser !== idUser && isFavourite === false && (
                        <TouchableOpacity style={styles.addButton} onPress={handleAddFavourite}>
                            <Text style={styles.buttonFavouriteText}>{getPalabra("Add_favorite")}</Text>
                        </TouchableOpacity>
                    )}
                    {activeUser !== idUser && isFavourite === true && (
                        <TouchableOpacity style={styles.addButton} onPress={handleRemoveFavourite}>
                            <Text style={styles.buttonFavouriteText}>{getPalabra("Remove_favorite")}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {typeUser === 'Consumer' ? (
                    <ConsumerCheck navigation={navigation} userData={userData} />
                ) : typeUser === 'Productor' ? (
                    <ProductorCheck navigation={navigation} userData={userData} id={idUser}/>
                ) : typeUser === 'Minorista' ? (
                    <MinoristaCheck navigation={navigation} userData={userData} id={idUser} />
                )
                : null}
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


