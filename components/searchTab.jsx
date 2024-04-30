import React,  {useState, useCallback } from 'react'
import { COLORS, SIZES, URL} from '../constants/theme'
import { TextInput, StyleSheet } from 'react-native'


const SearchTab = () =>{
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <TextInput
            placeholder= 'Search by name' 
            clearButtonMode='always' 
            style={styles.searchBar} 
            autoCapitalize='words'
            autoCorrect={false}
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
    )
};

const styles = StyleSheet.create({ // Define styles object
    searchBar:{
        paddingHorizontal: 10,
        //paddingVertical: 10,
        //paddingBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 15,
        width: (SIZES.width)/100 *90,
        height: SIZES.height/100*5,
        alignSelf: 'center',
        alignItems: 'center'
    }
});

export default SearchTab;