import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/userCard.styles';


import { fetchUser } from '../api_service/ApiConsultar_Usuario';
import { userId } from '../informacion/User';
import { getPalabra } from '../informacion/User';
import {userType} from '../informacion/User'


const UserProfile = ({navigation, idUser}) => {

    const [userData, setUserData] = useState([]);
    const [activeUser, setActiveUser] = useState(userId());


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
        userLoad();
    });

    return (
        <View style={styles.container}>
            <View style={styles.capsule}>
                {userData.avatar ? (
                    <Image source={userData.avatar} style={styles.avatar} />
                ) : null}
                <Text style={styles.usernameLarge}>{(userData.username != null)? userData.username : "loading..."}</Text>
                {userData.telephone && (
                    <View style={styles.telephoneContainer}>
                        <Ionicons name="call" size={24} color="black" />
                        <Text style={styles.telephone}>{userData.telephone}</Text>
                    </View>
                )}
                {userData.description && (
                    <Text style={styles.description}>{userData.description}</Text>
                )}
                {userData.reach !== null && (
                    <Text style={styles.reach}>Alcance: {userData.reach} km</Text>
                )}
            </View>
            {activeUser === idUser && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('EditProfile', {userData, navigation})}>
                        <Text style={styles.botonEditar}>{getPalabra("edit_profile")}</Text>
                    </TouchableOpacity>
                </View>
            )}
            {userType() == "Productor" && activeUser === idUser &&  (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('AfegirFrases')}>
                        <Text style={styles.botonEditar}>Afegir frases predefinides</Text>
                    </TouchableOpacity>
                </View>)
            }
        </View>
    );
};

export default UserProfile;
