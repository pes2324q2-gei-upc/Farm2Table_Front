import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import { userId, getPalabra } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { registerProductorService } from '../api_service/ApiRegistroProductor';
import STYLES from '../styles/productor.style';

const Productor = () => {
  const [num_acreditation, setAcreditation] = useState("");
  const [name, setName] = useState("");
  const [error_message, setError] = useState('');
  const NAVIGATOR = useNavigation();

  const handleGoBack = () => {
    NAVIGATOR.goBack();
  };

  const handleRegister = async () => {
    console.log("Nombre:", name);
    console.log("Num acreditacio:", num_acreditation);
    console.log("UserId", userId())

    try {
        const data = await registerProductorService(num_acreditation, name);
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
                {getPalabra("producer")}
            </Text>

            <Text style={STYLES.texto}>
                {getPalabra("fill_data")}
            </Text>

            <View style={STYLES.fondo_nif}>

                <TextInput 
                    style={STYLES.nif}
                    placeholder={getPalabra("name_producer")}
                    value={name}
                    onChangeText={setName}
                >
                
                </TextInput>

            </View>
            
            <View style={STYLES.fondo_nif}>

                <TextInput 
                    style={STYLES.nif}
                    placeholder={getPalabra("acreditation_number")}
                    value={num_acreditation}
                    onChangeText={setAcreditation}
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

export default Productor;
