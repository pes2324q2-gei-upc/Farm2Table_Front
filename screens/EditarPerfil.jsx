import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants/theme'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'

const Avatar = 'https://pes-deploy.s3.amazonaws.com/avatars/Captura_de_pantalla_2024-03-14_161349_Ncq98p1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA47CR2W7N4B54HLQW%2F20240319%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240319T151714Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=000ebc1d05040debb5e62ec9e5c3b64d0c26aa38fb582617d5f264d0d0a95b91'

const Products = () => { 
  const[username, setusername] = useState('');
  const[descripcio, setdescripcio] = useState('');
  const[resum, setresum] = useState('');
  const[number, setnumber] = useState('');

  return (
    <SafeAreaView style={styles.top}>
      <View style={styles.vista}>
        <Image
          source={require('../assets/images/149071.png')}
          style={styles.profileImage}
        />
        <View style={styles.v1}>
          <Text style={styles.titulo1}>Nom</Text>
          <TextInput
            placeholder={'Nou nom d' + "'" + 'usuari'}
            placeholderTextColor={'gray'}
            value={username}
            onChangeText={(txt)=>setusername(txt)}
            maxLength={25}
            style={styles.input}
          />
        </View>
        <View style={styles.v1}>
          <Text style={styles.titulo1}>Descripció</Text>
          <TextInput
            placeholder='Breu descripció'
            placeholderTextColor={'gray'}
            value={descripcio}
            onChangeText={(txt)=>setdescripcio(txt)}
            maxLength={50}
            multiline={true}
            style={styles.input}
          />
        </View>
        
        <View style={styles.v1}>
          <Text style={styles.titulo1}>Sobre tu</Text>
          <TextInput
            placeholder='Descripció general'
            placeholderTextColor={'gray'}
            value={resum}
            onChangeText={(txt)=>setresum(txt)}
            maxLength={200}
            style={styles.input}
          />
        </View>

        <View style={styles.v1}>
          <Text style={styles.titulo1}>Telèfon</Text>
          <TextInput
            placeholder='Nou telèfon'
            placeholderTextColor={'gray'}
            value={number}
            onChangeText={(txt)=>setnumber(txt)}
            maxLength={9}
            style={styles.input}
            keyboardType="numeric"
            inputMode="numeric"
          />
        </View>
      </View>
      <View style ={styles.bottom}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttontext}>Torna</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttontext}>Accepta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  buttontext:{
    width: 100,
    textAlign: 'center',
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '700',
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
  button: {
    backgroundColor: 'transparent',
    borderColor: COLORS.secondary,
    borderWidth: 2.5,
    width:'34%',
    height: '20%',
    //paddingHorizontal: 10,
    //paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection: 'row'
  },
  top:{
    width: '100%',
    backgroundColor: COLORS.primary,
    height: SIZES.height,
  },
  vista:{
    width: '100%',
    //backgroundColor: 'blue',
    height: (SIZES.height/100)*60,
  },
  v1:{
    //backgroundColor: 'red',
    width: '90%',
    alignSelf: 'center',
    height: '11%',
    borderTopColor: COLORS.secondary,
    borderTopWidth: '0.5',
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: '0.5',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%'
  },
  titulo1:{
    width: 100,
    textAlign: 'center',
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  input:{
    flex: 1,
    //backgroundColor: 'green',
    height: '100%',
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    textColor:'blue'
  },
  profileImage: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 20,
    marginLeft: 10,
    alignSelf: 'center'
  },
})
export default Products