import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Productor from '../Register/Productor';
import Minorista from '../Register/Minorista';
import Particular from '../Register/Particular';
import { getPalabra } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import STYLES from '../styles/escollirUsuari.style';


const EscollirUsuari = () => {

  const [tipus_usuari, setTipusUsuari] = useState([false, false, false]);
  const NAVIGATOR = useNavigation();

  const USUARIS = {
    productor: 0,
    minorista: 1,
    particular: 2
  };

  const handleProductor = () => {
    console.log("Productor");
    NAVIGATOR.navigate("Productor");
  };

  const handleMinorista = () => {
    console.log("Minorista");
    NAVIGATOR.navigate("Minorista");
  };

  const handleParticular = () => {
    console.log("Particular");
    NAVIGATOR.navigate("Particular");
  };

  return (
    <View style={STYLES.container}>

        {!tipus_usuari[USUARIS.minorista] &&
         !tipus_usuari[USUARIS.productor] &&
         !tipus_usuari[USUARIS.particular] &&
            (
                <>
                <Image source={logo} style={STYLES.logo} />

                <Text style={STYLES.escollir_usuari}>
                    {getPalabra("choose_user")}
                </Text>

                <TouchableOpacity onPress={handleProductor} style={STYLES.productor}> 
                    <Text style={STYLES.titulo}>{getPalabra("producer")}</Text>
                    <Text style={STYLES.texto}>{getPalabra("producer_text")}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleMinorista} style={STYLES.minorista}> 
                    <Text style={STYLES.titulo}>{getPalabra("retail")}</Text>
                    <Text style={STYLES.texto}>{getPalabra("retail_text")}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleParticular} style={STYLES.particular}> 
                    <Text style={STYLES.titulo}>{getPalabra("particular")}</Text>
                    <Text style={STYLES.texto}>{getPalabra("particular_text")}</Text>
                </TouchableOpacity>
                </>
            )}

            {tipus_usuari[USUARIS.productor] && <Productor />}
            {tipus_usuari[USUARIS.minorista] && <Minorista />}
            {tipus_usuari[USUARIS.particular] && <Particular />}

    </View>
  );

};

export default EscollirUsuari;
