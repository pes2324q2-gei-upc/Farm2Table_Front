import React, {  useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { TIPUS_IDIOMA, renderCataluña, renderEspaña, renderInglaterra, setIdioma } from '../informacion/User';
import STYLES from '../styles/inici_registre.style'

const SeleccioIdioma = ( { handleCambioIdioma } ) => {

    const [cambioIdioma, setCambioIdioma] = useState(false);

    const handleIdioma = (idioma) => {
        setIdioma(idioma);
        handleCambioIdioma()
        setCambioIdioma(!cambioIdioma)
    };

    return (

        <View style={STYLES.base_banderas_desplegable}>

            <View style={STYLES.fondo_banderas}>
                <TouchableOpacity onPress={() => handleIdioma(TIPUS_IDIOMA[0])} style={{marginTop: 10}}> 
                <Image source={renderEspaña()} style={STYLES.bandera}></Image> 
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleIdioma(TIPUS_IDIOMA[1])} style={{marginTop: 10}}> 
                <Image source={renderCataluña()} style={STYLES.bandera}></Image> 
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleIdioma(TIPUS_IDIOMA[2])} style={{marginTop: 10}}> 
                <Image source={renderInglaterra()} style={STYLES.bandera}></Image> 
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default SeleccioIdioma;