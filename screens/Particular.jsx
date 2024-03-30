import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import logo from '../assets/Farm2Table.png';
import { SelectList } from 'react-native-dropdown-select-list';
import { userId } from '../informacion/User';
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
        backgroundColor: '#a8d5a2',
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
    desplegable2: {
        top: 180,
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
    fondo_abast: {    
        marginTop: 25,
        width: 280,
        height: 40,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    abast: {
        fontSize: 20,
        color: '#749969',
        fontWeight: 'bold',
        right: 20,
        width: 220,
        height: 40
    },
  });

const Particular = () => {

  const [productes, setProductes] = useState([]);
  const [abast, setAbast] = useState();
  const PRODUCTES = ['Fruita', 'Verdura', 'Hortalisses', 'Carn', 'Peix', 'Formatge', 'Altres'];
  const NAVIGATOR = useNavigation();

  const handleRegister = () => {
    console.log("Abast:", abast);
    console.log("Productes:", productes);
    console.log("UserId", userId());

    const data = {
        reach: abast,
        products: productes,
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
    
    const url = 'http://'+getIP()+'/users/register/Consumer/'+userId()+'/';
    
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
                Particular
            </Text>

            <Text style={STYLES.texto}>
                Emplena les següents dades per millorar la teva experència
            </Text>

            <View style={STYLES.fondo_abast}>

                <TextInput 
                    style={STYLES.abast}
                    placeholder='El teu abast (kilometres)'
                    value={abast}
                    onChangeText={setAbast}
                >
                
                </TextInput>
                    
            </View>

        </View>
        
        <TouchableOpacity style={STYLES.comensa} onPress={handleRegister}>
            <Text style={STYLES.texto_comensa}>
                COMENÇA    
            </Text>           
        </TouchableOpacity>

        
    </View>
  );

};

export default Particular;
