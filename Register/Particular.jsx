import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import { getPalabra, userId } from '../informacion/User';
import { getIP } from '../informacion/Constants';
import { useNavigation } from '@react-navigation/native';
import { registerParticularService } from '../api_service/ApiRegistroParticular';
import STYLES from '../styles/particular.style';

const Particular = () => {

  const [productes, setProductes] = useState([]);
  const [abast, setAbast] = useState();
  const PRODUCTES = ['Fruita', 'Verdura', 'Hortalisses', 'Carn', 'Peix', 'Formatge', 'Altres'];
  const [error_message, setError] = useState('');
  const NAVIGATOR = useNavigation();

  const handleGoBack = () => {
    NAVIGATOR.goBack();
  };

  const handleRegister = async () => {
    console.log("Abast:", abast);
    console.log("Productes:", productes);
    console.log("UserId", userId());

    try {
        const data = await registerParticularService(abast, productes);
        if (data.error) {
          setError(data.error)
          console.log(error_message);
        }
        else {
            console.log(data);
            NAVIGATOR.navigate('Footer');
        }
      } catch (err) {console.log("Error:",err.message);}

  };

  return (
    <View style={STYLES.container}>

        <Image source={logo} style={STYLES.logo} />

        <TouchableOpacity style={STYLES.flecha_posicion} onPress={handleGoBack}>
            <Icon  name="arrow-back" style={STYLES.flecha} />  
        </TouchableOpacity>

        <Text style={STYLES.error_message}>{getPalabra(error_message)}</Text>

        <View style={STYLES.productor}>

            <Text style={STYLES.titulo}>
                {getPalabra("particular")}
            </Text>

            <Text style={STYLES.texto}>
                {getPalabra("fill_data")}
            </Text>

            <View style={STYLES.fondo_abast}>

                <TextInput 
                    style={STYLES.abast}
                    placeholder={getPalabra("reach")}
                    value={abast}
                    onChangeText={setAbast}
                >
                
                </TextInput>
                    
            </View>

        </View>
        
        <TouchableOpacity style={STYLES.comensa} onPress={handleRegister}>
            <Text style={STYLES.texto_comensa}>
                {getPalabra("start_button")}    
            </Text>           
        </TouchableOpacity>

        
    </View>
  );

};

export default Particular;
