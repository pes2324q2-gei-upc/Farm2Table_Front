import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES} from '../App'
import { AntDesign } from '@expo/vector-icons'
import { TextInput } from 'react-native'
const Buscador = () => {
    return (
        <SafeAreaView style = {styles.info}>
            <View style={styles.top}>

            </View>
            <View style={styles.bottom}>
                <TextInput placeholder= 'Search' clearButtonMode='always' style={styles.searchBar} />
                
                
               
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    info: {
        width: '100%',
        backgroundColor: COLORS.secondary,
        height: SIZES.height/100,
        flex:1,
    }, 
    top: {
        width: '100%',
        backgroundColor: COLORS.secondary,
        height: (SIZES.height/100)*10,
    },
    bottom: {
        width: '100%',
        backgroundColor: COLORS.primary,
        height: (SIZES.height/100)*90,
        paddingTop: 30,
        alignItems: 'center'
    },
    searchBar:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 15,
        width: (SIZES.width)/100 *90,
        alignContent: 'cen'
    }
})
export default Buscador