import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, } from 'react-native';
import logo from '../assets/Farm2Table.png';
import { userId, getPalabra } from '../informacion/User';
import { getIP } from '../informacion/Constants';
import { useNavigation } from '@react-navigation/native';

const STYLES = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      backgroundColor: '#fefae0',
      position: 'relative',
    },
    logo: {
      //la relacion es 498width/322height
      width: 393,
      height: 254,
    },
    productor: {
        flexDirection: 'column',
        marginTop: 25,
        width: 325,
        height: 370,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: '#6d9461',
        borderRadius: 10,
    },
    titulo: {
        marginTop: 10,
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
    },
    texto: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    comensa: {
        marginTop: 20,
        backgroundColor: '#bc6c25',
        width: 250,
        height: 45,
        borderRadius: 10,
        elevation: -1,
    },
    texto_comensa: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 8,
    },
    desplegable: {
        top: 120,
        left: 24,
        position: 'absolute',
        bottom: 100,
        width: 140,
        height: 100,
        elevation: -1
    },
    desplegable2: {
        top: 180,
        left: 24,
        position: 'absolute',
        bottom: 100,
        width: 140,
        height: 100,
        elevation: -1,
    },
    desplegable3: {
        top: 240,
        left: 24,
        position: 'absolute',
        bottom: 100,
        width: 140,
        height: 100,
        elevation: -1,
    },
    desplegable4: {
        top: 300,
        left: 24,
        position: 'absolute',
        bottom: 100,
        width: 140,
        height: 100,
        elevation: -1,
    },
    desplegable1: {
        width: 280,
        height: 55,
        justifyContent: 'top',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 1,
    },
    sector_texto: {
        fontSize: 20,
        color: '#749969',
        marginLeft: 0,
        fontWeight: 'bold',
    },
    sector_textos: {
        fontSize: 16,
        color: '#749969',
        fontWeight: 'bold',
    },
    fondo_nif: {    
        marginTop: 25,
        width: 280,
        height: 40,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    nif: {
        fontSize: 20,
        color: '#749969',
        fontWeight: 'bold',
        right: 20,
        width: 220,
        height: 40
    },
  });

const Productor = () => {

  const [nif, setNif] = useState("");
  const [num_acreditation, setAcreditation] = useState("");
  const [name, setName] = useState("");
  const NAVIGATOR = useNavigation();

  const handleRegister = () => {
    console.log("NIF:", nif);
    console.log("Num acreditacio:", num_acreditation);
    console.log("Nombre:", name);
    console.log("UserId", userId())

    const data = {
        nif: nif,
        num_acreditation: num_acreditation,
        name_productor: name
    };
    
    const csrfToken = '';
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
          },
        body: JSON.stringify(data)
    };
    
    const url = 'http://'+getIP()+'/users/register/Productor/'+userId()+'/';
    
    fetch(url, requestOptions)
        .then(response => {

        return response.json();
        })
        .then(data => {
        console.log(data);
        NAVIGATOR.navigate('Footer');

        })
        .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        });
  };

  return (
    <View style={STYLES.container}>

        <Image source={logo} style={STYLES.logo} />

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
                    placeholder={getPalabra("nif")}
                    value={nif}
                    onChangeText={setNif}
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
