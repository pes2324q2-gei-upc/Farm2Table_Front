import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import logo from '../assets/Farm2Table.png';
import { SelectList } from 'react-native-dropdown-select-list';
import { getPalabra, userId } from '../informacion/User';
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
        backgroundColor: '#86af7e',
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
  });

const Minorista = () => {

  const [tipus, setTipus] = useState("");
  const TIPUS = [getPalabra("restaurant"),getPalabra("market")];
  const NAVIGATOR = useNavigation();

  const handleRegister = () => {
    console.log("Tipus:", tipus);
    console.log("UserId", userId());

    const data = {
        service: tipus,
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
    
    const url = 'http://'+getIP()+'/users/register/Minorista/'+userId()+'/';
    
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
                {getPalabra("retail")}
            </Text>

            <Text style={STYLES.texto}>
                {getPalabra("fill_data")}
            </Text>     

            <View style={STYLES.desplegable}>
                <SelectList 
                    placeholder = {getPalabra("service_type")}
                    boxStyles={STYLES.desplegable1}
                    inputStyles={STYLES.sector_texto}
                    setSelected={ (val) => setTipus(val)}
                    data={TIPUS} 
                    save="value"     
                    dropdownStyles={{backgroundColor: 'white' , maxHeight: 140, maxWidth: 280}}
                    dropdownTextStyles={STYLES.sector_textos}
                    search={false}
                />
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

export default Minorista;
