import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import logo from '../assets/Farm2Table.png';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Productor = () => {

  const [sector, setDesplegable] = useState("");
  const [productes, setDesplegable2] = useState([]);
  const [abast, setDesplegable3] = useState("");
  const [interessos, setDesplegable4] = useState("");

  const SECTORES = ['Agricultura','Ramaderia', 'Ambdues'];
  const PRODUCTES = ['Fruita', 'Verdura', 'Hortalisses', 'Carn', 'Peix', 'Formatge', 'Altres'];
  const ABAST = [];
  const INTERESSOS = [];


  const STYLES = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      backgroundColor: '#fefae0',
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
        height: 350,
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
    },
    texto_comensa: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 8,
    },
    desplegable1: {
        marginTop: 10,
        width: 280,
        height: 55,
        justifyContent: 'top',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    flecha: {
        fontWeight: 'bold',
        color: '#749969'
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
  


  return (
    <View style={STYLES.container}>

        <Image source={logo} style={STYLES.logo} />

        <View style={STYLES.productor}>

            <Text style={STYLES.titulo}>
                Productor
            </Text>

            <Text style={STYLES.texto}>
                Emplena les següents dades per millorar la teva experència
            </Text>

            <SelectList 
                placeholder = 'El teu sector'
                boxStyles={STYLES.desplegable1}
                inputStyles={STYLES.sector_texto}
                setSelected={(val) => setDesplegable(val)} 
                data={SECTORES} 
                save="value"     
                dropdownStyles={{backgroundColor: 'white' , maxHeight: 140, maxWidth: 280}}
                dropdownTextStyles={STYLES.sector_textos}
                search={false}
            />



            <MultipleSelectList
                placeholder = 'Els teus productes'
                boxStyles={STYLES.desplegable1}
                inputStyles={STYLES.sector_texto}   
                setSelected={(val) => setDesplegable2(val)} 
                data={PRODUCTES} 
                save="value"     
                dropdownStyles={{backgroundColor: 'white' , maxHeight: 140, maxWidth: 280 }}
                dropdownTextStyles={STYLES.sector_textos}
                search={false}
                label='Productes'
                labelStyles={{color: '#749969', fontSize: 16}}
            />

        </View>
        
        <TouchableOpacity style={STYLES.comensa}>
            <Text style={STYLES.texto_comensa}>
                COMENÇA    
            </Text>           
        </TouchableOpacity>
    </View>
  );

};

export default Productor;
