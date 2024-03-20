import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Productor from './Productor';
import Minorista from './Minorista';
import Particular from './Particular';

const EscollirUsuari = () => {

  const USUARIS = {
    productor: 0,
    minorista: 1,
    particular: 2
  };

  const [tipus_usuari, setTipusUsuari] = useState([false, false, false]);

  const handleProductor = () => {
    console.log("Productor");
    setTipusUsuari([true, false, false]);
  };

  const handleMinorista = () => {
    console.log("Minorista");
    setTipusUsuari([false, true, false]);
  };

  const handleParticular = () => {
    console.log("Particular");
    setTipusUsuari([false, false, true]);
  };

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
    escollir_usuari: {
        marginTop: 10,
        fontSize: 40,
        color: '#bc6c25',
        fontWeight: 'bold'
    },
    productor: {
        marginTop: 25,
        width: 350,
        height: 100,
        justifyContent: 'top',
        backgroundColor: '#6d9461',
        borderRadius: 10,
    },
    minorista: {
        marginTop: 25,
        width: 350,
        height: 100,
        justifyContent: 'top',
        backgroundColor: '#86af7e',
        borderRadius: 10,
    },
    particular: {
        marginTop: 25,
        width: 350,
        height: 100,
        justifyContent: 'top',
        backgroundColor: '#a8d5a2',
        borderRadius: 10,
    },
    titulo: {
        marginTop: 10,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    texto: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
        marginLeft: 20,
        fontWeight: 'bold',
    },
  });
  

  return (
    <View style={STYLES.container}>

        {!tipus_usuari[USUARIS.minorista] &&
         !tipus_usuari[USUARIS.productor] &&
         !tipus_usuari[USUARIS.particular] &&
            (
                <>
                <Image source={logo} style={STYLES.logo} />

                <Text style={STYLES.escollir_usuari}>
                    Escull el teu usuari
                </Text>

                <TouchableOpacity onPress={handleProductor} style={STYLES.productor}> 

                    <Text style={STYLES.titulo}>
                        Productor
                    </Text>

                    <Text style={STYLES.texto}>
                        Pensat per productors locals
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleMinorista} style={STYLES.minorista}> 

                    <Text style={STYLES.titulo}>
                        Minorista
                    </Text>

                    <Text style={STYLES.texto}>
                        Pensat per a petits comerços
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleParticular} style={STYLES.particular}> 

                    <Text style={STYLES.titulo}>
                        Particular
                    </Text>

                    <Text style={STYLES.texto}>
                        Pensat per a consumidors individuals
                    </Text>
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
