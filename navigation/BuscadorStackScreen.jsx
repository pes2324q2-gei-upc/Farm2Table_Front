import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Buscador from '../Buscador/Buscador';
import Consultar_Usuario from '../Users/Consultar_Usuario';
import EditarPerfil from '../Users/EditarPerfil';
import Restaurante from '../Restaurants/Restaurante';
import Valorar from '../Restaurants/Valorar';

const BuscadorStack = createNativeStackNavigator();

const BuscadorStackScreen = () => {
    return (
        <BuscadorStack.Navigator
            initialRouteName="BuscadorScreen"
            screenOptions={{ headerShown: false }}>
            <BuscadorStack.Screen name="BuscadorScreen" component={Buscador} />
            <BuscadorStack.Screen name="Consultar_Usuario" component={Consultar_Usuario} />
            <BuscadorStack.Screen name="EditarPerfil" component={EditarPerfil} />
            <BuscadorStack.Screen name="Restaurante" component={Restaurante} />
            <BuscadorStack.Screen name="Valorar" component={Valorar} />
        </BuscadorStack.Navigator>
    );
};
export default BuscadorStackScreen;
