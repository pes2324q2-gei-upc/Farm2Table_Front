import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import EscollirUsuari from './EscollirUsuari';
import { setUserId, userId } from '../informacion/User';

const Registre = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [secure_text_entry, setSecureTextEntry] = useState(true);
  const [secure_text_entry_2, setSecureTextEntry2] = useState(true);
  const [recordar_contrasenya, setRecordarContrasenya] = useState(true);
  const [escollir_usuari, setEscollirUsuari] = useState(false);
  
  const handleRegister = async () => {
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm_Password', confirm_password);
    console.log('Me acuerdo', recordar_contrasenya ? "no": "si");

    const data = {
        email: username,
        password: password,
        repeat_password: confirm_password,
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
    
    const url = 'http://13.39.109.155/users/register/';
    
    fetch(url, requestOptions)
        .then(response => {
          
        return response.json();
        })
        .then(data => {
        console.log(data);
        console.log("dataCoso:", data.data.user_id);
        setUserId(data.data.user_id);
        console.log("UserId", userId());

        setEscollirUsuari(true);
        })
        .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        });

    //setEscollirUsuari(true);
  };

  const contrasenyaVisible = () => {
    setSecureTextEntry(!secure_text_entry);
  };

  const contrasenyaVisible2 = () => {
    setSecureTextEntry2(!secure_text_entry_2);
  };

  const recordarContrasenya = () => {
    setRecordarContrasenya(!recordar_contrasenya);
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
    correo: {
      marginTop: 60,
      flexDirection: 'row', 
      alignItems: 'center', 
      borderWidth: 2, 
      borderColor: '#bc6c25', 
      borderRadius: 5, 
      padding: 5, 
    },
    texto_correo: {
      fontSize: 18,
      width: 270,
      height: 30,
      color: "#bc6c25"
    },
    contrasenya: {
      marginTop: 40,
      flexDirection: 'row', 
      alignItems: 'center', 
      borderWidth: 1, 
      borderColor: 'black', 
      borderRadius: 5, 
      padding: 5,
    },
    texto_contrasenya: {
      fontSize: 18,
      width: 270,
      height: 30,
      color: "black"
    },
    visibilidad: { 
      position: 'absolute', 
      right: 10,
    },
    recuerdate: {
      marginTop: 5,
      marginLeft: 140,
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 5,
    },
    registro: {
      marginTop: 60,
      width: 280,
      height: 40,
      alignItems: 'center',
      backgroundColor: "#bc6c25",
      borderRadius: 10,
    },
    registro_texto: {
      marginTop: 8,
      fontSize: 20,
      color: "white",
      fontWeight: 'bold'
    },
  });
  

  return (
    <View style={STYLES.container}>
      {!escollir_usuari && (
        <>
            <Image source={logo} style={STYLES.logo} />

            <View style={STYLES.correo}>
            <Icon name="email" size={20} color="#bc6c25" style={{ marginRight: 7 }} />
            <TextInput
                style={STYLES.texto_correo}
                placeholder="Correu electrònic"
                value={username}
                onChangeText={setUsername}
            />
            </View>

            <View style={STYLES.contrasenya}>
            <Icon name="lock" size={20} color ="black" style={{marginRight: 7}}/>
            <TextInput 
                style={STYLES.texto_contrasenya}
                placeholder="Contrasenya"
                secureTextEntry={secure_text_entry}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={contrasenyaVisible} style={STYLES.visibilidad}>
                <Icon name={secure_text_entry ? "visibility-off" : "visibility"} size={20} color="black" />
            </TouchableOpacity>
            </View>

            <View style={STYLES.contrasenya}>
            <Icon name="lock" size={20} color ="black" style={{marginRight: 7}}/>
            <TextInput 
                style={STYLES.texto_contrasenya}
                placeholder="Confirma la contrasenya"
                secureTextEntry={secure_text_entry_2}
                value={confirm_password}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={contrasenyaVisible2} style={STYLES.visibilidad}>
                <Icon name={secure_text_entry_2 ? "visibility-off" : "visibility"} size={20} color="black" />
            </TouchableOpacity>
            </View>

            <View style={STYLES.recuerdate}>

            <TouchableOpacity onPress={recordarContrasenya}>
                <Icon name={recordar_contrasenya ? "check-box-outline-blank" : "check-box"} size={20} color="black" />
            </TouchableOpacity>

            <Text style={{position: 'absolute', marginLeft: 30, fontSize: 14}}>
                Enrecorda't
            </Text>
            </View>

            <TouchableOpacity onPress={handleRegister} style={STYLES.registro}>
            <Text style={STYLES.registro_texto}>REGISTRA'T</Text>
            </TouchableOpacity>
        </>
      )}

        {escollir_usuari && <EscollirUsuari />}


    </View>
  );

};

export default Registre;
