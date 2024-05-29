import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import {  getPalabra, renderFlagImage, setEmail, setUserId } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { registerService } from '../api_service/ApiRegistro';
import STYLES from '../styles/inici_registre.style';
import SeleccioIdioma from '../components/seleccioIdioma';

const Registre = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [secure_text_entry, setSecureTextEntry] = useState(true);
  const [secure_text_entry_2, setSecureTextEntry2] = useState(true);
  const [error_message, setError] = useState('');
  const NAVIGATOR = useNavigation();
  const [cambioIdioma, setCambioIdioma] = useState(false);

  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  
  const handleRegister = async () => {

    try {
      const data = await registerService(username, password, confirm_password);
      if (data.error) {
        setError(data.error);
        console.log(error_message);
      }
      else {
        setUserId(data.data.user_id);
        setEmail(username);
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

  const handleGoBack = () => {
    NAVIGATOR.navigate("InicioSesion");
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

      <TouchableOpacity onPress={handleRegister} style={STYLES.registro}>
      <Text style={STYLES.inicio_registro_texto}>{getPalabra("register_button")}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );

};

export default Registre;
