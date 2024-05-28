import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import Header from '../navigation/header_back';
import { fetchUser } from '../api_service/ApiConsultar_Usuario';
import { userId, getPalabra, userType } from '../informacion/User';
import { addFavourite, isUserFavourite, removeFavourite } from '../api_service/APIFavoritos';

import ConsumerCheck from './consumerCheck';
import ProductorCheck from './productorCheck';
import MinoristaCheck from './minoristaCheck';

const ProfileScreen = ({ navigation, route }) => {
    let { idUser, typeUser } = route.params;

    const [userData, setUserData] = useState([]);
    const avatarUri = userData.avatar ? { uri: userData.avatar } : require('../assets/images/149071.png');

    const [isFavourite, setIsFavourite] = useState(false);
    const activeUser = userId();


    if (typeUser === undefined) {
        typeUser = userType();
    }

    const handleAddFavourite = async () => {
        try {
            const tipo = userType().toLowerCase() + 's';
            const type = typeUser.toLowerCase() + 's';
            const routeIdUser = idUser;
            await addFavourite(activeUser, type, tipo, routeIdUser);
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
            await removeFavourite(activeUser, type, tipo, routeIdUser);
            setIsFavourite(false);
        } catch (error) {
            console.error("Failed to remove favourite:", error);
        }
    };

    useEffect(() => {
        const userLoad = async () => {
            const user = idUser ? idUser : userId();
            try {
                const data = await fetchUser(user);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data: ", error);
            }
        };
        const checkIfFavourite = async () => {
            try {
                const tipo = userType().toLowerCase() + 's';
                const type = typeUser.toLowerCase() + 's';
                const routeIdUser = idUser;
                const response = await isUserFavourite(activeUser, type, tipo, routeIdUser);
                setIsFavourite(response.data.some(obj => obj.id === routeIdUser));
            } catch (error) {
                console.error("Failed to check if user is favourite:", error);
            }
        };
        if (activeUser !== idUser && userType() !== typeUser) checkIfFavourite();
        userLoad();
    }, [activeUser, idUser, typeUser]);

    return (
        <SafeAreaView style={styles.safecontainer}>
            <Header />
            <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
                <View style={styles.profileContainer}>
                        <Image source={avatarUri} style={styles.avatar} />

                    <View style={styles.usernameRow}>
                        <Text style={styles.usernameLarge}>{userData.username}</Text>
                        {activeUser !== idUser && userType() !== typeUser && (
                            <TouchableOpacity onPress={isFavourite ? handleRemoveFavourite : handleAddFavourite}>
                                <Ionicons
                                    name={isFavourite ? "heart" : "heart-outline"}
                                    size={30}
                                    color={COLORS.tertiary}
                                    style={styles.heartIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {userData.telephone && (
                        <View style={styles.telephoneContainer}>
                            <Ionicons name="call" size={18} color="white" />
                            <Text style={styles.telephone}>{userData.telephone}</Text>
                        </View>
                    )}
                </View>
                {typeUser === 'Consumer' ? (
                    <ConsumerCheck navigation={navigation} userData={userData} />
                ) : typeUser === 'Productor' ? (
                    <ProductorCheck navigation={navigation} userData={userData} id={idUser} />
                ) : typeUser === 'Minorista' ? (
                    <MinoristaCheck navigation={navigation} userData={userData} id={idUser} />
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
    usernameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    usernameLarge: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    heartIcon: {
        marginLeft: 10,
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
});

export default ProfileScreen;
