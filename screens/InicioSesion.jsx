import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import google from '../assets/Google.png';
import { setUserId, setUserType, userId, userType, getPalabra, setIdioma, TIPUS_IDIOMA, getIdioma } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { loginService } from '../api_service/ApiInicioSesion';
import STYLES from '../styles/inicioSesion.style';
import { SelectList } from 'react-native-dropdown-select-list';

const InicioSesion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure_text_entry, setSecureTextEntry] = useState(true); 
  const [recordar_contrasenya, setRecordarContrasenya] = useState(true);
  const [refresh, setRefresh] = useState(false);
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
        if (data.data.user_type === null) { NAVIGATOR.navigate("EscollirUsuari"); console.log("Nulo");}
        else {
          setUserType(data.data.user_type);
          
          console.log("UserId", userId());
          console.log("Type", userType());
          NAVIGATOR.navigate('Footer');
        }
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

  const handleIdioma = (idioma) => {
    console.log("Handle_Idioma");
    setIdioma(idioma);
    setRefresh(!refresh);
  };

  return (
    <View style={STYLES.container}>

      <Image source={logo} style={STYLES.logo} />

      <View style={{
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        position: 'absolute',
        right: 10,
        top: 30,
      }}> 
        <SelectList 
            placeholder = {getIdioma()}
            boxStyles={{backgroundColor: '#bc6c25', opacity:  0.9}}
            setSelected={ (val) => handleIdioma(val)}
            data={TIPUS_IDIOMA} 
            save="value"     
            dropdownStyles={{backgroundColor: '#bc6c25' , maxHeight: 80, maxWidth: 100}}
            dropdownTextStyles={{backgroundColor: '#bc6c25'}}
            search={false}
        />
      </View>

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
