import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import { getPalabra, getPalabraEng, getRestaurantOrMercat, userId } from '../informacion/User';
import { getIP } from '../informacion/Constants';
import { useNavigation } from '@react-navigation/native';
import { registerMinoristaService } from '../api_service/ApiRegistroMinorista';
import STYLES from '../styles/minorista.style';

const Minorista = () => {

  const [tipus, setTipus] = useState("");
  const TIPUS = [getPalabra("restaurant"),getPalabra("market")];
  const [servei, setServei] = useState("");
  const [error_message, setError] = useState('');
  const NAVIGATOR = useNavigation();

  const handleGoBack = () => {
    NAVIGATOR.goBack();
  };

  const handleRegister = async () => {
    
    console.log("Tipus:", tipus);
    console.log("nomServei", servei);
    console.log("UserId", userId());
    
    const tipus_cat = getRestaurantOrMercat(tipus);
    console.log("TIPUS CAT",tipus_cat);

    try {
        const data = await registerMinoristaService(tipus_cat, servei);
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
                {getPalabra("retail")}
            </Text>

            <Text style={STYLES.texto}>
                {getPalabra("fill_data")}
            </Text>     

            <View style={STYLES.desplegable2}>
                <View style={{marginTop: 14, marginLeft: 20,}}>
                  <TextInput 
                      placeholder = {getPalabra("service_name")}
                      style={STYLES.sector_texto}
                      value={servei}
                      onChangeText={setServei}
                  />
                </View>
            </View>

            <View style={STYLES.desplegable}>
                <SelectList 
                    placeholder = {getPalabra("service_type")}
                    boxStyles={STYLES.desplegable1}
                    inputStyles={STYLES.sector_texto}
                    setSelected={ (val) => setTipus(val)}
                    data={TIPUS} 
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

export default Minorista;
