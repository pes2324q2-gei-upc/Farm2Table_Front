import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/Farm2Table.png';

const Particular = () => {


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
    particular: {
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
    }
  });
  

  return (
    <View style={STYLES.container}>

        <Image source={logo} style={STYLES.logo} />

        <View style={STYLES.particular}>

            <Text style={STYLES.titulo}>
                Particular
            </Text>

            <Text style={STYLES.texto}>
                Emplena les següents dades per millorar la teva experència
            </Text>

        </View>
        
        <TouchableOpacity style={STYLES.comensa}>
            <Text style={STYLES.texto_comensa}>
                COMENÇA    
            </Text>           
        </TouchableOpacity>
    </View>
  );

};

export default Particular;
