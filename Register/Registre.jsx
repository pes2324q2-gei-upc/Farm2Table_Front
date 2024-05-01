import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import EscollirUsuari from '../Register/EscollirUsuari';
import { TIPUS_IDIOMA, getIdioma, getPalabra, setEmail, setIdioma, setUserId, userId } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { registerService } from '../api_service/ApiRegistro';
import STYLES from '../styles/registre.style';
import { SelectList } from 'react-native-dropdown-select-list';

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
  const [refresh, setRefresh] = useState(false);
  
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

  const handleIdioma = (idioma) => {
    console.log("Handle_Idioma");
    setIdioma(idioma);
    setRefresh(!refresh);
  };

  return (
    <View style={STYLES.container}>
      {!escollir_usuari && (
        <>
          
          <Image source={logo} style={STYLES.logo} />

          <TouchableOpacity style={STYLES.flecha_posicion} onPress={handleGoBack}>
            <Icon  name="arrow-back" style={STYLES.flecha} />  
          </TouchableOpacity>
          
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
