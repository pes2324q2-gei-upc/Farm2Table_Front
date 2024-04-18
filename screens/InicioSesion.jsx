import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import google from '../assets/Google.png';
import { setUserId, setUserType, userId, userType, getPalabra } from '../informacion/User';
import { getIP } from '../informacion/Constants';
import { useNavigation } from '@react-navigation/native';
import { loginService } from '../api_service/ApiInicioSesion';

const InicioSesion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure_text_entry, setSecureTextEntry] = useState(true); 
  const [recordar_contrasenya, setRecordarContrasenya] = useState(true);
  const NAVIGATOR = useNavigation();
  const [error_message, setError] = useState('');

  const handleLogin = async () => {
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const data = await loginService(username, password);
      if (data.error) {
        setError(data.error)
        console.log(error_message);
      }
      else {
        console.log("dataId:", data.data.user_id);
        setUserId(data.data.user_id);
        setUserType(data.data.user_type);
        console.log("UserId", userId());
        console.log("Type", userType());
        NAVIGATOR.navigate('Footer');
      }
    } catch (err) {console.log(err.message);}
    

  };

  const contrasenyaVisible = () => {
    setSecureTextEntry(!secure_text_entry);
  };

  const recordarContrasenya = () => {
    setRecordarContrasenya(!recordar_contrasenya);
  };

  const contrasenyaOlvidada = () => {
    console.log("Contrasenya oblidada");
  };

  const inicioConGoogle = () => {
    console.log("Inici amb google");
  };

  const registrarse = () => {
    console.log("Registrar-se");
    NAVIGATOR.navigate('Registre');
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
    error_message: {
      fontSize: 19,
      marginTop: 25,
      color: "#ff0000"
    },
    correo: {
      marginTop: 30,
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
    contrasenya_olvidada: {
      marginTop: 20,
      color: "#bc6c25",
      fontSize: 18,
    },
    inicio_sesion: {
      marginTop: 20,
      width: 280,
      height: 40,
      alignItems: 'center',
      backgroundColor: "#bc6c25",
      borderRadius: 10,
    },
    inicio_sesion_texto: {
      marginTop: 8,
      fontSize: 20,
      color: "white",
      fontWeight: 'bold'
    },
    o: {
      fontSize: 15,
      marginTop: 10,
    },
    inicio_google: {
      marginTop: 10,
      width: 280,
      height: 40,
      alignItems: 'center',
      backgroundColor: "white",
      borderRadius: 20,
      borderColor: 'black',
      borderWidth: 1,
    },
    google: {
      //la relacion es 1 a 1
      width: 20,
      height: 20,
      position: 'absolute',
      left: 10,
      marginTop: 10,
    },
    inicio_google_texto: {
      marginTop: 10,
      fontSize: 14,
      color: "#cc8f58",
      fontWeight: 'bold'
    },
    crear_cuenta: {
      flexDirection: "row",
      marginTop: 20,
    },
    crear_cuenta_boton: {
      marginLeft: 20,
    },
  });
  

  return (
    <View style={STYLES.container}>

      <Image source={logo} style={STYLES.logo} />

      <Text style={STYLES.error_message}>{error_message}</Text>

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

      <View style={STYLES.recuerdate}>

        <TouchableOpacity onPress={recordarContrasenya}>
          <Icon name={recordar_contrasenya ? "check-box-outline-blank" : "check-box"} size={20} color="black" />
        </TouchableOpacity>

        <Text style={{position: 'absolute', marginLeft: 30, fontSize: 14}}>
          {getPalabra("remember_password")}
        </Text>
      </View>

      <TouchableOpacity onPress={contrasenyaOlvidada}>
        <Text style={STYLES.contrasenya_olvidada}>{getPalabra("password_forgotten")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={STYLES.inicio_sesion}>
        <Text style={STYLES.inicio_sesion_texto}>{getPalabra("logging_button")}</Text>
      </TouchableOpacity>


      <Text style={STYLES.o}>{getPalabra("or")}</Text>

      <TouchableOpacity onPress={inicioConGoogle} style={STYLES.inicio_google}>
        <Image source={google} style={STYLES.google}/>
        <Text style={STYLES.inicio_google_texto}>{getPalabra("logging_google_button")}</Text>
      </TouchableOpacity>

      <View style={STYLES.crear_cuenta}>
        <Text style={{fontSize: 14}}>{getPalabra("no_account?")}</Text>
        <TouchableOpacity onPress={registrarse} style={STYLES.crear_cuenta_boton}>
          <Text style={{fontSize: 14, color: "#bc6c25"}}>{getPalabra("create_account")}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

};

export default InicioSesion;
