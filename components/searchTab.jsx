import React,  {useState, useCallback } from 'react'
import { COLORS, SIZES, URL} from '../constants/theme'
import { TextInput, StyleSheet } from 'react-native'


const SearchTab = ({ placeholder, style, onChangeText }) =>{
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor= 'grey' 
          clearButtonMode="always"
          style={[styles.searchBar, style]}
          autoCapitalize="words"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            onChangeText(text);
          }}
        />
    );
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