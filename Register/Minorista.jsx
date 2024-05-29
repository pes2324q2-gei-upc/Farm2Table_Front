import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import logo from '../assets/Farm2Table.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import { getPalabra, getRestaurantOrMercat, renderFlagImage, userId } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { registerMinoristaService } from '../api_service/ApiRegistroMinorista';
import STYLES from '../styles/inici_registre.style';
import SeleccioIdioma from '../components/seleccioIdioma';
import { typeProducts } from '../api_service/ApiTiposProductos';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const Minorista = () => {

  const [tipus, setTipus] = useState("");
  const TIPUS = [getPalabra("restaurant"),getPalabra("market")];
  const [servei, setServei] = useState("");
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
    const tipus_cat = getRestaurantOrMercat(tipus);

    try {
        const selectedNames = items
            .filter(item => selectedItems.includes(item.id))
            .map(item => item.name);
        const data = await registerMinoristaService(tipus_cat, servei, selectedNames);
        if (data.error) {
          setError(data.error)
          console.log(error_message);
        }
        else {
            NAVIGATOR.navigate('Footer');
        }
      } catch (err) {console.log("Error:",err.message);}

  };

  const setServiceType = (val) => {
    setTipus(val)
  }

  //useEffect()

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

        <View style={[STYLES.base_recuadros, STYLES.minorista]}>

            <Text style={[STYLES.base_texto, STYLES.titulo_registro_tipos]}>
                {getPalabra("retail")}
            </Text>

            <Text style={[STYLES.base_texto, STYLES.texto_registro_tipos]}>
                {getPalabra("fill_data")}
            </Text>     

            <View style={[STYLES.base_fondo_datos, STYLES.fondo_input_datos]}>
                <TextInput 
                    placeholder = {getPalabra("service_name")}
                    style={[STYLES.base_texto_datos, STYLES.texto_input_datos]}
                    value={servei}
                    onChangeText={setServei}
                />
            </View>

            

        </View>

        <TouchableOpacity style={STYLES.fondo_boton_comensa} onPress={handleRegister}>
            <Text style={[STYLES.base_texto, STYLES.texto_comensa]}>
                {getPalabra("start_button")}    
            </Text>           
         </TouchableOpacity>

         <View style={[STYLES.base_fondo_datos, STYLES.fondo_favorits]}>
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

            <View style={[STYLES.base_fondo_datos, STYLES.fondo_servicio]}>
                <SelectList 
                    placeholder = {getPalabra("service_type")}
                    boxStyles={STYLES.box_lista}
                    inputStyles={STYLES.texto_lista}
                    setSelected={ (val) => setServiceType(val)}
                    data={TIPUS} 
                    save="value"     
                    dropdownStyles={{backgroundColor: 'white' , maxHeight: 140, maxWidth: 280}}
                    dropdownTextStyles={STYLES.texto_lista}
                    search={false}
                />
            </View>
    
    </SafeAreaView>
  );

};

export default Minorista;
