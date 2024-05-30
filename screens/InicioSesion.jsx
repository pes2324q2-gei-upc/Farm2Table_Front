import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import google from '../assets/Google.png';
import { setUserId, setUserType, getPalabra, renderFlagImage,  } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { loginService } from '../api_service/ApiInicioSesion';
import STYLES from '../styles/inici_registre.style';
import SeleccioIdioma from '../components/seleccioIdioma';
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
//import { googleSignIn } from '../api_service/API_GoogleSignIn';


const InicioSesion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure_text_entry, setSecureTextEntry] = useState(true); 
  const NAVIGATOR = useNavigation();
  const [error_message, setError] = useState('');
  const [cambioIdioma, setCambioIdioma] = useState(false);

  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = async () => {

    try {
      const data = await loginService(username, password);
      if (data.error) {
        setError(data.error)
        console.log(error_message);
      }
      else {
        setUserId(data.data.user_id);
        if (data.data.user_type === null) { NAVIGATOR.navigate("EscollirUsuari"); }
        else {
          setUserType(data.data.user_type);
          NAVIGATOR.navigate('Footer');
        }
      }
    } catch (err) {console.log(err.message);}
  };

  const contrasenyaVisible = () => {
    setSecureTextEntry(!secure_text_entry);
  };
//  const inicioConGoogle = async () => {
//      try {
//        await GoogleSignin.hasPlayServices();
//        await GoogleSignin.signOut();
//        const userInfo = await GoogleSignin.signIn();
//        try {
//          const response = await googleSignIn(userInfo.idToken);
//          if (response.error) {
//            setError(response.error)
//            console.log(error_message);
//          }
//          else {
//            setUserId(response.data.user_id);
//            if (response.data.user_type === null || response.data.user_type == undefined) { NAVIGATOR.navigate("EscollirUsuari"); }
//            else {
//              setUserType(response.data.user_type);
//              console.log("ID = ", response.data.user_id);
//              console.log("TYPE = ", response.data.user_type);
//              NAVIGATOR.navigate('Footer');
//            }
//          }
//        } catch (err) {console.log(err.message);}
//      } catch (error) {
//        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//          console.log('User Cancelled the Sign-In Process');
//        } else if (error.code === statusCodes.IN_PROGRESS) {
//          console.log('Sign-In is already in progress');
//        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//          console.log('Play Services not available');
//        } else {
//          console.log('Error', error);
//        }
//      }
//    };
  const registrarse = () => {
    NAVIGATOR.navigate('Registre');
  };

  const handleCambioIdioma = () => {
    setCambioIdioma(!cambioIdioma)
  };

  return (
    <SafeAreaView style={STYLES.container}>

      <Image source={logo} style={STYLES.logo} />

      { cambioIdioma && <SeleccioIdioma handleCambioIdioma={handleCambioIdioma} />}      

      <TouchableOpacity style={STYLES.cambio_idioma} onPress={handleCambioIdioma}>
        <Image source={renderFlagImage()} style={STYLES.bandera} />
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

      <TouchableOpacity onPress={handleLogin} style={STYLES.inicio_sesion}>
        <Text style={STYLES.inicio_registro_texto}>{getPalabra("logging_button")}</Text>
      </TouchableOpacity>


      <Text style={STYLES.o}>{getPalabra("or")}</Text>

      <TouchableOpacity /*onPress={inicioConGoogle}*/ style={STYLES.inicio_google}>
        <Image source={google} style={STYLES.google}/>
        <Text style={STYLES.inicio_google_texto}>{getPalabra("logging_google_button")}</Text>
      </TouchableOpacity>

      <View style={STYLES.crear_cuenta}>
        <Text style={{fontSize: 14}}>{getPalabra("no_account?")}</Text>
        <TouchableOpacity onPress={registrarse} style={STYLES.crear_cuenta_boton}>
          <Text style={{fontSize: 14, color: "#bc6c25"}}>{getPalabra("create_account")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

export default InicioSesion;
