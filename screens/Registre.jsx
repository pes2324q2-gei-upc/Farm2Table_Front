import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import EscollirUsuari from './EscollirUsuari';
import { getPalabra, setEmail, setUserId, userId } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { registerService } from '../api_service/ApiRegistro';

const Registre = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [secure_text_entry, setSecureTextEntry] = useState(true);
  const [secure_text_entry_2, setSecureTextEntry2] = useState(true);
  const [recordar_contrasenya, setRecordarContrasenya] = useState(true);
  const [escollir_usuari, setEscollirUsuari] = useState(false);
  const [error_message, setError] = useState('');
  const NAVIGATOR = useNavigation();
  
  const handleRegister = async () => {
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm_Password', confirm_password);
    console.log('Me acuerdo', recordar_contrasenya ? "no": "si");

    try {
      const data = await registerService(username, password, confirm_password);
      if (data.error) {
        setError(data.error);
        console.log(error_message);
      }
      else {
        console.log(data);
        console.log("dataCoso:", data.data.user_id);
        setUserId(data.data.user_id);
        setEmail(username);
        console.log("UserId", userId());
        NAVIGATOR.navigate("EscollirUsuari");
      }
    } catch (err) {console.log(err.message)}

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

  const handleGoBack = () => {
    NAVIGATOR.navigate("InicioSesion");
  };

  const STYLES = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      backgroundColor: '#fefae0',
    },
    flecha_posicion: {
      position: 'absolute',
      left: 10,
      top: 20,
    },
    flecha: {
      color: "#bc6c25",
      fontSize: 45,
    },
    logo: {
      //la relacion es 498width/322height
      width: 393,
      height: 254,
    },
    error_message: {
      fontSize: 19,
      marginTop: 25,
      color: "#ff0000"
    },
    correo: {
      marginTop: 15,
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

          <TouchableOpacity style={STYLES.flecha_posicion} onPress={handleGoBack}>
            <Icon  name="arrow-back" style={STYLES.flecha} />  
          </TouchableOpacity>
          

          <Text style={STYLES.error_message}>{getPalabra(error_message)}</Text>

          <View style={STYLES.correo}>
          <Icon name="email" size={20} color="#bc6c25" style={{ marginRight: 7 }} />
          <TextInput
              style={STYLES.texto_correo}
              placeholder={getPalabra("email")}
              value={username}
              onChangeText={setUsername}
          />
          </View>

          <View style={STYLES.contrasenya}>
          <Icon name="lock" size={20} color ="black" style={{marginRight: 7}}/>
          <TextInput 
              style={STYLES.texto_contrasenya}
              placeholder={getPalabra("password")}
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
              placeholder={getPalabra("confirm_password")}
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
            {getPalabra("remember_password")}
          </Text>
          </View>

          <TouchableOpacity onPress={handleRegister} style={STYLES.registro}>
          <Text style={STYLES.registro_texto}>{getPalabra("register_button")}</Text>
          </TouchableOpacity>
        </>
      )}

        {escollir_usuari && <EscollirUsuari />}


    </View>
  );

};

export default Registre;
