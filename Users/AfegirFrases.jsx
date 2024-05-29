import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../navigation/header_back'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert, TextInput, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import {createWord, getMatchPhrase,loginInService} from '../api_service/API_ServeiExtern'
import {getPalabra} from '../informacion/User'
import {getToken,setToken} from '../informacion/Constants'

const AfegirFrases = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [pairs, setPairs] = useState([{ keys: '', phrase: '' }]);
    //const [token,setToken] = useState('')

    useEffect(() => {
      //if (token == '') {
        setToken('')
        console.log("me logeo")
        const login = async() => {
            const data = await loginInService()
            //console.log("token substring: " + data.token.substring(7))
            //setToken(data.token.substring(7))
            setToken(data.token)
            console.log(token)
        }
        login()
      //}
    },[])

    const handleKeyChange = (index, value) => {
        const newPairs = [...pairs];
        newPairs[index].keys = value;
        setPairs(newPairs);
      };
    
      const handlePhraseChange = (index, value) => {
        const newPairs = [...pairs];
        newPairs[index].phrase = value;
        setPairs(newPairs);
      };
    
      const addPair = () => {
        setPairs([...pairs, { keys: '', phrase: '' }]);
      };

      const handleAccepta = async () => {
        const token = getToken()
        const data = await createWord(pairs,token)
        // aqui debo de mostrar un pop-up
        return data
      }

      return (
        <SafeAreaView >
            <Header />
            <View style={styles.container_bot}>
                <View style={styles.headerRow_bot}>
                <Text style={styles.headerCell_bot}>Claus (' , ' entre elles)</Text>
                <Text style={styles.headerCell_bot}>Frase</Text>
                </View>
                {pairs.map((pair, index) => (
                <View key={index} style={styles.row_bot}>
                    <TextInput
                    placeholder='Claus'
                    value={pair.keys}
                    onChangeText={(text) => handleKeyChange(index, text)}
                    style={styles.input_bot}
                    />
                    <TextInput
                    placeholder='Frase'
                    value={pair.phrase}
                    onChangeText={(text) => handlePhraseChange(index, text)}
                    style={styles.input_bot}
                    />
                </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={addPair}>
                    <Text style={styles.buttontext}>{getPalabra("addRow")}</Text>
                </TouchableOpacity>
                {/* <Button title="Add Pair" style={styles.button} onPress={addPair} /> */}
            </View>

            <View style ={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={handleAccepta}> 
                {/* <TouchableOpacity style={styles.button}> */}
                    <Text style={styles.buttontext}>{getPalabra("accept")}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      )
}
const styles = StyleSheet.create({
    container_bot: {
        padding: 20,
      },
      headerRow_bot: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 5,
      },
      headerCell_bot: {
        flex: 1,
        fontWeight: 'bold',
      },
      row_bot: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 5,
      },
      input_bot: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginHorizontal: 5,
      },
      button: {
        backgroundColor: 'transparent',
        borderColor: COLORS.secondary,
        borderWidth: 2.5,
        width:'30%',
        height: '20%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      bottom: {
        //backgroundColor: 'red',
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: '12%'
      },
      buttontext:{
        width: 100,
        textAlign: 'center',
        color: COLORS.secondary,
        fontSize: 14,
        fontWeight: '700',
      },
      container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
      },
})

export default AfegirFrases