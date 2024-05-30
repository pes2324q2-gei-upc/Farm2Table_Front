import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import Header from '../navigation/header_back';
import { fetchUser, fetchSpecificInfo } from '../api_service/ApiConsultar_Usuario';
import { userId, userType } from '../informacion/User';
import { addFavourite, isUserFavourite, removeFavourite, getUsersBoughtList, getCommentsList } from '../api_service/APIFavoritos';
import ConsumerCheck from './consumerCheck';
import ProductorCheck from './productorCheck';
import MinoristaCheck from './minoristaCheck';
import { Rating } from 'react-native-ratings';
import {useFocusEffect} from "@react-navigation/native";

const ProfileScreen = ({ navigation, route }) => {
    let { idUser, typeUser } = route.params;

    const [userData, setUserData] = useState([]);
    const avatarUri = userData.avatar ? { uri: userData.avatar } : require('../assets/images/149071.png');

    const [isFavourite, setIsFavourite] = useState(false);
    const [usersBoughtList, setUsersBoughtList] = useState([]);
    const [commentsList, setCommentsList] = useState([]);
    const [rating, setRating] = useState(0);
    const activeUser = userId();

    if (typeUser === undefined) {
        typeUser = userType();
    }

    const handleAddFavourite = async () => {
        try {
            const tipo = userType().toLowerCase() + 's';
            const type = typeUser.toLowerCase() + 's';
            await addFavourite(activeUser, type, tipo, idUser);
            setIsFavourite(true);
        } catch (error) {
            console.error("Failed to add favourite:", error);
        }
    };

    const handleRemoveFavourite = async () => {
        try {
            const tipo = userType().toLowerCase() + 's';
            const type = typeUser.toLowerCase() + 's';
            await removeFavourite(activeUser, type, tipo, idUser);
            setIsFavourite(false);
        } catch (error) {
            console.error("Failed to remove favourite:", error);
        }
    };

    const addRating = async () => {
        try {
            const type = typeUser.toLowerCase();
            navigation.navigate("Valorar", { restaurantId: idUser, nomRestaurant: userData.username, tipus: type });
        } catch (error) {
            console.error("Failed to do rating", error);
        }
    }; // vi nicius balon de oro

    useEffect(() => {
        const userLoad = async () => {
            const user = idUser ? idUser : userId();
            try {
                const data = await fetchSpecificInfo(user);
                setUserData(data);
                setRating(data.rating)
            } catch (error) {
                console.error("Failed to fetch user data: ", error);
            }
        };

        const checkIfFavourite = async () => {
            try {
                const tipo = userType().toLowerCase() + 's';
                const type = typeUser.toLowerCase() + 's';
                const response = await isUserFavourite(activeUser, type, tipo, idUser);
                setIsFavourite(response.data.some(obj => obj.id === idUser));
            } catch (error) {
                console.error("Failed to check if user is favourite:", error);
            }
        };

        const fetchUsersBoughtList = async () => {
            try {
                const type = typeUser.toLowerCase();
                const data = await getUsersBoughtList(idUser, type);
                setUsersBoughtList(data.data);
            } catch (error) {
                console.error("Failed to fetch users bought list:", error);
            }
        };
        const fetchRating = async () => {
            try {
                const data = await fetchSpecificInfo(idUser);
                setRating(data.rating);
            } catch (error) {
                console.error("Failed to fetch rating:", error);
            }
        };

        if (activeUser !== idUser && userType() !== typeUser) checkIfFavourite();
        userLoad();
        //fetchRating();
        if (idUser !== activeUser) {
            const type = typeUser.toLowerCase();
            if (type === 'productor') {
                fetchUsersBoughtList();
            }
        }
    }, [activeUser, idUser, typeUser]);

    useFocusEffect(
        useCallback(() => {
            const fetchComments = async () => {
                try {
                    const type = typeUser.toLowerCase();
                    const data = await getCommentsList(idUser, type);
                    setCommentsList(data.data);
                } catch (error) {
                    console.error("Failed to fetch comments list:", error);
                }
            };
            if (activeUser !== idUser) fetchComments();
        }, [idUser, typeUser])
    );

    const userHasBoughtFromIdUser = usersBoughtList.some(data => data.buyer.id === activeUser);
    const userHasComment = commentsList.some(data => data.commentor.id === activeUser);


    return (
        <SafeAreaView style={styles.safecontainer}>
            <Header />
            <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
                <View style={styles.profileContainer}>
                    <Image source={avatarUri} style={styles.avatar} />
                    <View style={styles.usernameRow}>
                        <Text style={styles.usernameLarge}>{(userData.service != null)? userData.service_name : (userData.productor_name != null) ? userData.productor_name : (userData.username != null)? userData.username : "loading..."}</Text>
                        {activeUser !== idUser && userType() !== typeUser && (
                            <>
                                <TouchableOpacity onPress={isFavourite ? handleRemoveFavourite : handleAddFavourite}>
                                    <Ionicons
                                        name={isFavourite ? "heart" : "heart-outline"}
                                        size={30}
                                        color={COLORS.tertiary}
                                        style={styles.heartIcon}
                                    />
                                </TouchableOpacity>
                                { typeUser.toLowerCase() === "productor" && userHasBoughtFromIdUser && !userHasComment && (
                                    <TouchableOpacity onPress={addRating}>
                                        <Ionicons
                                            name={"star"}
                                            size={30}
                                            color={COLORS.tertiary}
                                            style={styles.heartIcon}
                                        />
                                    </TouchableOpacity>
                                )}
                                {typeUser.toLowerCase() === "minorista" && !userHasComment && (
                                    <TouchableOpacity onPress={addRating}>
                                        <Ionicons
                                            name={"star"}
                                            size={30}
                                            color={COLORS.tertiary}
                                            style={styles.heartIcon}
                                        />
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                    </View>
                    {(rating !== 0 && (typeUser.toLowerCase() === "minorista" || typeUser.toLowerCase() === "productor")) && (
                        <Rating
                            startingValue={3}
                            imageSize={30}
                            readonly
                            starStyle={'blue'}
                            tintColor={COLORS.secondary}
                        />
                    )}
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
    rating: {
        marginVertical: 10,
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
    starStyle: {
        tintColor: 'blue',
    },
});

export default ProfileScreen;
