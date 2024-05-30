import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Footer from './navigation/footer';
import InicioSesion from "./screens/InicioSesion";
import Registre from "./Register/Registre";
import EscollirUsuari from './Register/EscollirUsuari';
import Productor from './Register/Productor';
import Minorista from './Register/Minorista';
import Particular from './Register/Particular';
import MainFeed from './screens/Home';
import AddProduct from './Products/AddProduct';
import ProductDetails from './screens/ProductDetails';
import Consultar_Usuario from './Users/Consultar_Usuario';
import CartScreen from './Shopping/cart';
import Ticket from './Shopping/ticket';
import AddCoinsScreen from './Shopping/funds';
import CheckUser from './Users/CheckUser';
import OrderSummary from './Users/orderSummary';
import Orders from './Users/orderedProduct';
import EditProfile from './Users/EditProfile';
import AfegirFrases from './Users/AfegirFrases';
import EditProduct from './Products/EditProduct';
import ChatStackScreen from './navigation/ChatStackScreen';
import { COLORS, SIZES } from './constants/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getPalabra, logout, userId, userType } from './informacion/User';
import Logout from './Users/Logout';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Tabs" screenOptions={{
      drawerStyle: {
        backgroundColor: COLORS.primary,
        width: 240,
      },
    }}>
      <Drawer.Screen name="Home" component={Footer} options={{ headerShown: false }} />
      <Drawer.Screen name="Perfil" component={CheckUser} options={{ headerShown: false }} initialParams={{ idUser: userId(), typeUser: userType() }}/>
      <Drawer.Screen name={getPalabra("logout")} component={Logout} options={{ headerShown: false }}/>
      {/*<Drawer.Screen name="Perfil" component={CheckUser} options={{ headerShown: false }} />*/}
    </Drawer.Navigator>
  );
}

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

 // Initialize GoogleSignin
  // GoogleSignin.configure({
  //    webClientId: '967477216126-or0g8ip52dqordmc5hn2urtqh69la74f.apps.googleusercontent.com',
  //   });

  if (!fontsLoaded) return null;

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="InicioSesion" component={InicioSesion} options={{ headerShown: false }} />
            <Stack.Screen name="Registre" component={Registre} options={{ headerShown: false }} />
            <Stack.Screen name="EscollirUsuari" component={EscollirUsuari} options={{ headerShown: false }} />
            <Stack.Screen name="Productor" component={Productor} options={{ headerShown: false }} />
            <Stack.Screen name="Minorista" component={Minorista} options={{ headerShown: false }} />
            <Stack.Screen name="Particular" component={Particular} options={{ headerShown: false }} />
            <Stack.Screen name="Footer" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="MainFeed" component={MainFeed} options={{ headerShown: false }} />
            <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Consultar_Usuario" component={Consultar_Usuario} options={{ headerShown: false }} />
            <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Ticket" component={Ticket} options={{ headerShown: false }} />
            <Stack.Screen name="AddCoinsScreen" component={AddCoinsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CheckUser" component={CheckUser} options={{ headerShown: false }} />
            <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
            <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ headerShown: false }} />
            <Stack.Screen name="ChatStackScreen" component={ChatStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}} />
            <Stack.Screen name="AfegirFrases" component={AfegirFrases} options={{ headerShown: false }} />
            <Stack.Screen name="EditProduct" component={EditProduct} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
  );
}

export { COLORS, SIZES };
