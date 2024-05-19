import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/Farm2Table.png';
import { userId, getPalabra, renderFlagImage } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { registerProductorService } from '../api_service/ApiRegistroProductor';
import STYLES from '../styles/inici_registre.style';
import { SelectList } from 'react-native-dropdown-select-list';
import { getTipusProductes } from '../informacion/Constants'
import SeleccioIdioma from '../components/seleccioIdioma';

const Productor = () => {
  const [num_acreditation, setAcreditation] = useState("");
  const [name, setName] = useState("");
  const [error_message, setError] = useState('');
  const [favourite_prod, setFavourite] = useState("");
  const NAVIGATOR = useNavigation();
  const [cambioIdioma, setCambioIdioma] = useState(false);

  const handleGoBack = () => {
    NAVIGATOR.goBack();
  };

  const handleRegister = async () => {

    try {
        const data = await registerProductorService(num_acreditation, name, favourite_prod);
        if (data.error) {
          setError(data.error)
          console.log(error_message);
        }
        else {
            NAVIGATOR.navigate('Footer');
        }
      } catch (err) {console.log("Error:",err.message);}
    
  };

  const handleCambioIdioma = () => {
    setCambioIdioma(!cambioIdioma)
  };

  return (
    <View style={STYLES.container}>
            
        <Image source={logo} style={STYLES.logo} />

        { cambioIdioma && <SeleccioIdioma handleCambioIdioma={handleCambioIdioma} />}      

        <TouchableOpacity style={STYLES.cambio_idioma} onPress={handleCambioIdioma}>
            <Image source={renderFlagImage()} style={STYLES.bandera} />
        </TouchableOpacity>

        <TouchableOpacity style={STYLES.flecha_posicion} onPress={handleGoBack}>
            <Icon  name="arrow-back" style={STYLES.flecha} />  
        </TouchableOpacity>

        <Text style={STYLES.error_message}>{getPalabra(error_message)}</Text>

        <View style={[STYLES.base_recuadros, STYLES.productor]}>

            <Text style={[STYLES.base_texto, STYLES.titulo_registro_tipos]}>
                {getPalabra("producer")}
            </Text>
            <Text style={[STYLES.base_texto, STYLES.texto_registro_tipos]}>
                {getPalabra("fill_data")}
            </Text>

            <View style={[STYLES.base_fondo_datos, STYLES.fondo_input_datos]}>
                <TextInput 
                    style={[STYLES.base_texto_datos, STYLES.texto_input_datos]}
                    placeholder={getPalabra("name_producer")}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            
            <View style={[STYLES.base_fondo_datos, STYLES.fondo_input_datos]}>
                <TextInput 
                    style={[STYLES.base_texto_datos, STYLES.texto_input_datos]}
                    placeholder={getPalabra("acreditation_number")}
                    value={num_acreditation}
                    onChangeText={setAcreditation}
                >
                </TextInput>  
            </View>
        </View>

        <TouchableOpacity style={STYLES.fondo_boton_comensa} onPress={handleRegister}>
            <Text style={[STYLES.base_texto, STYLES.texto_comensa]}>
                {getPalabra("start_button")}    
            </Text>           
        </TouchableOpacity>

        <View style={[STYLES.base_fondo_datos, STYLES.fondo_favorits]}>
            <SelectList 
                boxStyles={STYLES.box_lista}
                placeholder={getPalabra("favourite_products")}
                inputStyles={STYLES.texto_lista}
                onChangeText={setAcreditation}
                setSelected={ (val) => setFavourite(val)}
                data={getTipusProductes}
                save="value"     
                dropdownStyles={{backgroundColor: 'white' , maxHeight: 140, maxWidth: 280}}
                dropdownTextStyles={STYLES.texto_lista}
                search={false} 
            />  
        </View>
        
    </View>
  );

};

export default Productor;
