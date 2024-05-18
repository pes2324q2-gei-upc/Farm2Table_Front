import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import { TIPUS_IDIOMA, getIdioma, getPalabra, setEmail, setIdioma, setUserId, userId } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { registerService } from '../api_service/ApiRegistro';
import STYLES from '../styles/inici_registre.style';
import { SelectList } from 'react-native-dropdown-select-list';

const Registre = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [secure_text_entry, setSecureTextEntry] = useState(true);
  const [secure_text_entry_2, setSecureTextEntry2] = useState(true);
  const [error_message, setError] = useState('');
  const NAVIGATOR = useNavigation();
  const [refresh, setRefresh] = useState(false);
  
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

  const handleIdioma = (idioma) => {
    setIdioma(idioma);
    setRefresh(!refresh);
  };

  return (
    <View style={STYLES.container}>
          
      <Image source={logo} style={STYLES.logo} />

      <TouchableOpacity style={STYLES.flecha_posicion} onPress={handleGoBack}>
        <Icon  name="arrow-back" style={STYLES.flecha} />  
      </TouchableOpacity>
      
      <View style={STYLES.cambio_idioma}> 
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

      <TouchableOpacity onPress={handleRegister} style={STYLES.registro}>
      <Text style={STYLES.inicio_registro_texto}>{getPalabra("register_button")}</Text>
      </TouchableOpacity>

    </View>
  );

};

export default Registre;
