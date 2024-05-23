import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import styles from '../styles/buscador.style';
import { TouchableOpacity } from 'react-native'
import Restaurante from '../Restaurants/Restaurante';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ProfileScreen from '../Users/CheckUser';
const RestaurantList = ({ data, searchQuery }) => {
  const handlePressRestaurant = (item, icon) => {
    navigation.navigate('ProfileScreen', { idUser: item.id, typeUser: "Minorista" });
  };
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    // Define the default icon
    let icon = null;
    // Check if the name contains the specified keywords and set the appropriate icon
    const lowerCaseName = item.service.toLowerCase();
  
    if (lowerCaseName.includes('bar')) {
      icon = <MaterialIcons name="local-bar" size={35} color="black" />;
    } else if (lowerCaseName.includes('pizza')) {
      icon = <MaterialIcons name="local-pizza" size={35} color="black" />;
    } else if (lowerCaseName.includes('café')) {
      icon = <MaterialIcons name="local-cafe" size={35} color="black" />;
    } else if (lowerCaseName.includes('kebab')) {
      icon = <MaterialIcons name="fastfood" size={35} color="black" />; // Kebab icon
    } else if (lowerCaseName.includes(" ramen")) {
      icon = <MaterialIcons name="ramen-dining" size={35} color="black" />; // Ramen icon
    } else if (lowerCaseName.includes('hamburger')) {
      icon = <MaterialIcons name="fastfood" size={35} color="black" />; // Hamburger icon
    } else {
      // If none of the keywords match, default to "restaurant-menu" icon
      icon = <MaterialIcons name="restaurant-menu" size={35} color="black" />;
    }
    
    return (
      <TouchableOpacity onPress={() => handlePressRestaurant(item, icon)}>
        <View style={styles.lista}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Render the icon */}
            {icon}
            {/* Render the item's name */}
            <Text style={styles.textName}>{item.service_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {data.length === 0 ? (
        <Text style={styles.emptyMessage}>No restaurants available</Text>
      ) : (
          <FlatList
            data={data.filter(item => item.service_name.toLowerCase().includes(searchQuery.toLowerCase()))}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
      )}
    </>
  );
};

export default RestaurantList;