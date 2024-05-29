import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getPalabra, renderFlagImage } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { registerParticularService } from '../api_service/ApiRegistroParticular';
import STYLES from '../styles/inici_registre.style';
import SeleccioIdioma from '../components/seleccioIdioma';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { typeProducts } from '../api_service/ApiTiposProductos';

const Particular = () => {
  const [abast, setAbast] = useState("");
  const [error_message, setError] = useState('');
  const NAVIGATOR = useNavigation();
  const [cambioIdioma, setCambioIdioma] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([{ name: 'Loading...', id: 1}]);

  const handleGoBack = () => {
    NAVIGATOR.goBack();
  };

  async function infoProductos() {
    try {
        const data = await typeProducts();
        if (data.error) {
            setError(data.error);
            console.log(data.error);
        } else {
            setItems(data)
        }
    } catch (err) {
        console.log(err.message);
        setError(err.message);
    }
}

  useEffect(() => {
    async function fetchData() {
        if (items.length === 1) await infoProductos();
    }
    fetchData();
  }, [items])

  const handleRegister = async () => {

    try {
        const selectedNames = items
            .filter(item => selectedItems.includes(item.id))
            .map(item => item.name);
        const data = await registerParticularService(abast, selectedNames);
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

        <View style={[STYLES.base_recuadros, STYLES.particular]}>

            <Text style={[STYLES.base_texto, STYLES.titulo_registro_tipos]}>
                {getPalabra("particular")}
            </Text>

            <Text style={[STYLES.base_texto, STYLES.texto_registro_tipos]}>
                {getPalabra("fill_data")}
            </Text>

            <View style={[STYLES.base_fondo_datos, STYLES.fondo_input_datos]}>
                <TextInput 
                    style={[STYLES.base_texto_datos, STYLES.texto_input_datos]}
                    placeholder={getPalabra("direction")}
                    value={abast}
                    onChangeText={setAbast}
                >
                </TextInput>
            </View>
        </View>
        
        <TouchableOpacity style={STYLES.fondo_boton_comensa} onPress={handleRegister}>
            <Text style={[STYLES.base_texto, STYLES.texto_comensa]}>
                {getPalabra("start_button")}    
            </Text>           
        </TouchableOpacity>

        <View style={[STYLES.base_fondo_datos, STYLES.fondo_servicio]}>
            <View style={{width: 280, height: 80}}>
            <SectionedMultiSelect
            styles={STYLES.productos_favoritos}
            items={items}
            IconRenderer={Icon}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedItems}
            selectedItems={selectedItems}
            selectText={getPalabra("select_product")}
            searchPlaceholderText={getPalabra("search_products")}
            hideSearch={false}
            showChips={false}
            alwaysShowSelectText={true}
            />
            </View>    
        </View>

        
    </SafeAreaView>
  );

};

export default Particular;
