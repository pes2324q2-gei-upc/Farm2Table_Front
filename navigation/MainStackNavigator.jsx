import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainFeed from '../screens/Home';
import AddProduct from '../screens/AddProduct';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainFeed" component={MainFeed} options={{ headerShown: false }} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
