import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Productor from '../Register/Productor';
import Minorista from '../Register/Minorista';
import Particular from '../Register/Particular';
import { TIPUS_IDIOMA, getIdioma, getPalabra, setIdioma } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import STYLES from '../styles/inici_registre.style';
import { SelectList } from 'react-native-dropdown-select-list';


const EscollirUsuari = () => {

  const [tipus_usuari, setTipusUsuari] = useState([false, false, false]);
  const NAVIGATOR = useNavigation();
  const [refresh, setRefresh] = useState(false);

  const USUARIS = {
    productor: 0,
    minorista: 1,
    particular: 2
  };

  const handleProductor = () => {
    NAVIGATOR.navigate("Productor");
  };

  const handleMinorista = () => {
    NAVIGATOR.navigate("Minorista");
  };

  const handleParticular = () => {
    NAVIGATOR.navigate("Particular");
  };

  const handleIdioma = (idioma) => {
    setIdioma(idioma);
    setRefresh(!refresh);
  };

  return (
    <View style={STYLES.container}>

      <Image source={logo} style={STYLES.logo} />

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

      <Text style={STYLES.escollir_usuari}>
          {getPalabra("choose_user")}
      </Text>

      <TouchableOpacity onPress={handleProductor} style={[STYLES.base_tipos, STYLES.productor]}> 
          <Text style={[STYLES.base_texto, STYLES.titulo_tipos]}>{getPalabra("producer")}</Text>
          <Text style={[STYLES.base_texto, STYLES.texto_tipos]}>{getPalabra("producer_text")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleMinorista} style={[STYLES.base_tipos, STYLES.minorista]}> 
          <Text style={[STYLES.base_texto, STYLES.titulo_tipos]}>{getPalabra("retail")}</Text>
          <Text style={[STYLES.base_texto, STYLES.texto_tipos]}>{getPalabra("retail_text")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleParticular} style={[STYLES.base_tipos, STYLES.particular]}> 
          <Text style={[STYLES.base_texto, STYLES.titulo_tipos]}>{getPalabra("particular")}</Text>
          <Text style={[STYLES.base_texto, STYLES.texto_tipos]}>{getPalabra("particular_text")}</Text>
      </TouchableOpacity>
               
    </View>
  );

};

export default EscollirUsuari;
