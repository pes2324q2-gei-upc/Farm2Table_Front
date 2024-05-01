import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { TIPUS_IDIOMA, getIdioma, setIdioma } from '../informacion/User';

const SeleccioIdioma = () => {
    return (
        <View style={STYLES.cambio_idioma}> 
        <SelectList 
            placeholder = {getIdioma()}
            boxStyles={{backgroundColor: '#bc6c25', opacity:  0.9}}
            inputStyles={STYLES.sector_texto}
            setSelected={ (val) => setIdioma(val)}
            data={TIPUS_IDIOMA} 
            save="value"     
            dropdownStyles={{backgroundColor: '#bc6c25' , maxHeight: 80, maxWidth: 100}}
            dropdownTextStyles={{backgroundColor: '#bc6c25'}}
            search={false}
        />
      </View>
    );
};

const STYLES = StyleSheet.create({
    cambio_idioma: {
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
    },
});

export default SeleccioIdioma;