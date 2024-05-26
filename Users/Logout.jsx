import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import { getPalabra, getRestaurantOrMercat, logout, renderFlagImage, userId } from '../informacion/User';
import {  getTipusProductes } from '../informacion/Constants';
import { useNavigation } from '@react-navigation/native';
import { registerMinoristaService } from '../api_service/ApiRegistroMinorista';
import STYLES from '../styles/inici_registre.style';
import SeleccioIdioma from '../components/seleccioIdioma';

const Logout = () => {

    const NAVIGATOR = useNavigation();

    useEffect(() => {
        logout()
        NAVIGATOR.navigate('InicioSesion');
      }, []);

  return (
    <View>

    </View>
  );

};

export default Logout;
