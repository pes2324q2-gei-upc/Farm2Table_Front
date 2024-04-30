import { View, Text} from 'react-native'
import React from 'react'
import { createBottomTabNavigator }from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Ionicons} from "@expo/vector-icons"

import Home from '../screens/Home'
import Map from '../Map/Map'
import Chat from '../screens/Chat'
import Restaurante from '../screens/Restaurante'
import Product from '../Products/Product'
import Buscador from '../screens/Buscador'
import Consultar_Usuario from '../screens/Consultar_Usuario';
import { COLORS, SIZES } from '../constants/theme' 
import EditarPerfil from '../screens/EditarPerfil';
import MensajesChat from "../screens/MensajesChat";

import Ticket from '../Shopping/ticket';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BuscadorStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: false,
    headerShown: false,
    tabBarStyle: {
        backgroundColor: COLORS.secondary,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0, 
        elevation: 0,
        height: '9%',
        paddingTop: 10,
    }
}

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator screenOptions={{headerShown: false }}>
            <ChatStack.Screen name="Chat" component={Chat} />
            <ChatStack.Screen name="MensajesChat" component={MensajesChat} />
        </ChatStack.Navigator>
    );
};
const BuscadorStackScreen = () => {
    return (
      <BuscadorStack.Navigator 
        initialRouteName="BuscadorScreen"
        screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false
          }}
      >
        <Stack.Screen name="BuscadorScreen" component={Buscador} />
        <Stack.Screen name="Consultar_Usuario" component={Consultar_Usuario} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} /> 
        <Stack.Screen name="Restaurante" component={Restaurante} />
      </BuscadorStack.Navigator>
    );
}

const Footer = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={Home} options={{
            tabBarIcon: ({ focused }) => {
                return (
                    <Ionicons
                        name={focused ? "home" : "home-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                );
            }
        }} />
        <Tab.Screen name="Map" component={Map} options={{
            tabBarIcon: ({ focused }) => {
                return (
                    <Ionicons
                        name={focused ? "map" : "map-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                );
            }
        }} />
        <Tab.Screen name="SearchTab" component={BuscadorStackScreen} options={{
            tabBarIcon: ({ focused }) => {
                return (
                    <Ionicons
                        name={focused ? "search" : "search-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                );
            }
        }} />
        <Tab.Screen name="Chat" component={ChatStackScreen} options={{
            tabBarIcon: ({ focused }) => {
                return (
                    <Ionicons
                        name={focused ? "chatbubbles" : "chatbubbles-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                );
            }
        }} />
            
       {/* <Tab.Screen name="Usuarios" component={Buscador} options={{
            tabBarIcon: ({ focused }) => {
                return (
                    <Ionicons
                        name={focused ? "search" : "search-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                );
            }
        }} /> */}
    
    </Tab.Navigator>
  )
}

export default Footer