import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import { getPalabra, userId } from '../informacion/User';
import { getIP, getTipusProductes } from '../informacion/Constants';
import { useNavigation } from '@react-navigation/native';
import { registerParticularService } from '../api_service/ApiRegistroParticular';
import STYLES from '../styles/particular.style';

const Particular = () => {
  const [abast, setAbast] = useState("");
  const [error_message, setError] = useState('');
  const [favourite_prod, setFavourite] = useState("");
  const NAVIGATOR = useNavigation();

  const handleGoBack = () => {
    NAVIGATOR.goBack();
  };

  const handleRegister = async () => {
    console.log("Direccion:", abast);
    console.log("Productes:", favourite_prod);
    console.log("UserId", userId());

    try {
        const data = await registerParticularService(abast, favourite_prod);
        if (data.error) {
          setError(data.error)
          console.log(error_message);
        }
        else {
            console.log(data);
            NAVIGATOR.navigate('Footer');
        }
      } catch (err) {console.log("Error:",err.message);}

  };

  return (
    <View style={STYLES.container}>

        <Image source={logo} style={STYLES.logo} />

        <TouchableOpacity style={STYLES.flecha_posicion} onPress={handleGoBack}>
            <Icon  name="arrow-back" style={STYLES.flecha} />  
        </TouchableOpacity>

        <Text style={STYLES.error_message}>{getPalabra(error_message)}</Text>

        <View style={STYLES.productor}>

            <Text style={STYLES.titulo}>
                {getPalabra("particular")}
            </Text>

            <Text style={STYLES.texto}>
                {getPalabra("fill_data")}
            </Text>

            <View style={STYLES.fondo_abast}>
                <TextInput 
                    style={STYLES.abast}
                    placeholder={getPalabra("direction")}
                    value={abast}
                    onChangeText={setAbast}
                >
                </TextInput>
            </View>

            <View style={STYLES.fondo_abast}>
                <SelectList 
                    placeholder = {getPalabra("favourite_products")}
                    boxStyles={STYLES.desplegable1}
                    inputStyles={STYLES.sector_texto}
                    setSelected={ (val) => setFavourite(val)}
                    data={getTipusProductes} 
                    save="value"     
                    dropdownStyles={{backgroundColor: 'white' , maxHeight: 140, maxWidth: 280}}
                    dropdownTextStyles={STYLES.sector_textos}
                    search={false}
                />
            </View>

        </View>
        
        <TouchableOpacity style={STYLES.comensa} onPress={handleRegister}>
            <Text style={STYLES.texto_comensa}>
                {getPalabra("start_button")}    
            </Text>           
        </TouchableOpacity>

        
    </View>
  );

};

export default Particular;
