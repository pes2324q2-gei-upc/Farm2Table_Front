import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Footer from './navigation/footer';
import MainFeed from './screens/Home';
import AddProduct from './screens/AddProduct';
import { COLORS, SIZES } from './constants/theme';


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
  });
  
  if(!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Footer" component={Footer} options={{headerShown: false}} />
        <Stack.Screen name="MainFeed" component={MainFeed} options={{headerShown: false}} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { COLORS, SIZES };