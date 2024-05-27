import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { userType } from '../informacion/User';
import { userId } from '../informacion/User';


//Este es el componente que se encarga de mostrar el header de la aplicación
//Este header se muestra en todas las pantallas de la aplicación
//Este header tiene el avatar del usuario logeado, un icono de carrito y un icono de configuración


const Header = () => {

    const navigation = useNavigation();

    const handleCartPress = () => {
        navigation.navigate('CartScreen');
    }


    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons
                        name="menu-outline" 
                        size={35} 
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
                <FontAwesome5 name="tractor" size={44} color="white" />
                <TouchableOpacity onPress={handleCartPress}>
                    <Ionicons
                        name="cart"
                        size={35}
                        color="white"
                        style={styles.settingsIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: -10,
        maxHeight: 150,
        backgroundColor: COLORS.secondary,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    },
    logo: {
        marginLeft: 20,
    },
    settingsIcon: {
        marginRight: 10,
    },
});

export default Header;
