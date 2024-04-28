import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Footer from './navigation/footer';
import MainFeed from './screens/Home';
import AddProduct from './screens/AddProduct';
import { COLORS, SIZES } from './constants/theme';
import ProductDetails from './screens/ProductDetails';
import Consultar_Usuario from './screens/Consultar_Usuario';
import CartScreen from './Shopping/cart';


/*
import SliderProducts from './products/SliderProducts';
*/
import { StyleSheet, Text, View } from 'react-native';
import Registre from "./screens/Registre";
import InicioSesion from "./screens/InicioSesion";
import EscollirUsuari from './screens/EscollirUsuari';



const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    black: require("./assets/fonts/Poppins-Black.ttf"),
    thin: require("./assets/fonts/Poppins-Thin.ttf"),
    ticket: require("./assets/fonts/Ticketing.ttf")
  });
  
  if(!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="InicioSesion" component={InicioSesion} options={{headerShown: false}} />
        <Stack.Screen name="Registre" component={Registre} options={{headerShown: false}} />
        <Stack.Screen name="EscollirUsuari" component={EscollirUsuari} options={{headerShown: false}} />
        <Stack.Screen name="Footer" component={Footer} options={{headerShown: false}} />
        <Stack.Screen name="MainFeed" component={MainFeed} options={{headerShown: false}} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{headerShown: false}} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{headerShown: false}} />
        <Stack.Screen name="Consultar_Usuario" component={Consultar_Usuario} options={{headerShown: false}} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { COLORS, SIZES };
