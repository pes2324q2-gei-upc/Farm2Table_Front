import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/Farm2Table.png';
import { TIPUS_IDIOMA, getIdioma, getPalabra, renderFlagImage, setIdioma } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import STYLES from '../styles/inici_registre.style';
import { SelectList } from 'react-native-dropdown-select-list';
import SeleccioIdioma from '../components/seleccioIdioma';


const EscollirUsuari = () => {
  const NAVIGATOR = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [cambioIdioma, setCambioIdioma] = useState(false);

  const handleProductor = () => {
    NAVIGATOR.navigate("Productor");
  };

  const handleMinorista = () => {
    NAVIGATOR.navigate("Minorista");
  };

  const handleParticular = () => {
    NAVIGATOR.navigate("Particular");
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
