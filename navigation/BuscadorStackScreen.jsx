import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Buscador from '../Buscador/Buscador';
import Consultar_Usuario from '../Users/Consultar_Usuario';
import Restaurante from '../Restaurants/Restaurante';
import Valorar from '../Restaurants/Valorar';
import ProfileScreen from '../Users/CheckUser';
import EditProfile from '../Users/EditProfile';

const BuscadorStack = createNativeStackNavigator();

const BuscadorStackScreen = () => {
    return (
        <BuscadorStack.Navigator
            initialRouteName="BuscadorScreen"
            screenOptions={{ headerShown: false }}>
            <BuscadorStack.Screen name="BuscadorScreen" component={Buscador} />
            <BuscadorStack.Screen name="Consultar_Usuario" component={Consultar_Usuario} />
            <BuscadorStack.Screen name="EditProfile" component={EditProfile} />
            <BuscadorStack.Screen name="Restaurante" component={Restaurante} />
            <BuscadorStack.Screen name="Valorar" component={Valorar} />
            <BuscadorStack.Screen name="ProfileScreen" component={ProfileScreen} />
        </BuscadorStack.Navigator>
    );
};
export default BuscadorStackScreen;
