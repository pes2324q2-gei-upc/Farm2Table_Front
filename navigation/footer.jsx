import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator }from '@react-navigation/bottom-tabs'
import {Ionicons} from "@expo/vector-icons"

import Home from '../screens/Home'
import Map from '../screens/Map'
import Products from '../screens/Products'
import Chat from '../screens/Chat'
import Consultar_Usuario from '../screens/Consultar_Usuario'

import { COLORS, SIZES } from '../constants/theme'

const Tab = createBottomTabNavigator();

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
        height: 70
    }
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
        <Tab.Screen name="Products" component={Products} options={{
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
        <Tab.Screen name="Chat" component={Chat} options={{
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
        
        <Tab.Screen name="Usuarios" component={Consultar_Usuario} options={{
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
    
    </Tab.Navigator>
  )
}

export default Footer