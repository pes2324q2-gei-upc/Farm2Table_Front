import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import Home from '../screens/Home';
import Map from '../Map/Map';
import ChatStackScreen from './ChatStackScreen';
import BuscadorStackScreen from './BuscadorStackScreen';
import { COLORS } from '../constants/theme';

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
        height: '9%',
        paddingTop: 10,
    }
}

const Footer = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="MainFeed" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "home" : "home-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                ),
            }} />
            <Tab.Screen name="Map" component={Map} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "map" : "map-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                ),
            }} />
            <Tab.Screen name="SearchTab" component={BuscadorStackScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "search" : "search-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                ),
            }} />
            <Tab.Screen name="ChatTab" component={ChatStackScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "chatbubbles" : "chatbubbles-outline"}
                        size={30}
                        color={focused ? COLORS.tertiary : COLORS.white}
                    />
                ),
            }} />
        </Tab.Navigator>
    );
}

export default Footer;
