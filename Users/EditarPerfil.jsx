import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native'
import FormData from "form-data"
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants/theme'
import { Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { submitPerfil } from '../api_service/ApiEditarPerfil'

import Header from '../navigation/header_back'

const EditarPerfil = () => { 
  const route = useRoute();
  const { item } = route.params;
  const[username, setusername] = useState(item.username);
  const[descripcio, setdescripcio] = useState(item.about_me);
  const[resum, setresum] = useState(item.brief_description);
  const[number, setnumber] = useState(item.telephone);
  const [imageUri, setImageUri] = useState(item.avatar);
  const navigation = useNavigation();

  const handleAccepta = async () => {
    if(!username.trim() || !descripcio.trim() || !resum.trim() || !number.trim()) {
      Alert.alert('Error', 'Omple tots els camps.');
      return;
    }
    item.username = username;
    item.brief_description = resum;
    item.about_me = descripcio;
    item.telephone = number;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("brief_description", descripcio);
    formData.append("about_me", resum);
    formData.append("telephone", number);

    if(imageUri) {
      console.log("llega");
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append("avatar", {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    try {
      const data = await submitPerfil(formData);
      item.avatar = data.data.avatar;
    } catch (error) {
        Alert.alert('Error', error.message);
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
      if(!imageUri) console.log("no va");
    }
    console.log("va");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <TouchableOpacity onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <Text style={styles.placeholderText}>Añadir Imagen</Text>
        )}
        </TouchableOpacity>
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
        
      <View style ={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttontext}>Torna</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text 
            style={styles.buttontext} 
            onPress={() => {
              console.log(imageUri)
            }}
          >
            Edita Productes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAccepta}>
          <Text style={styles.buttontext}>Accepta</Text>
        </TouchableOpacity>
    </View>

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
    width:'30%',
    height: '20%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  content: {
      backgroundColor: COLORS.primary,
      padding: 5,
      flex: 1,
  },
  top:{
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  vista:{
    width: '100%',
  },
  v1:{
    width: '90%',
    alignSelf: 'center',
    height: '11.6%',
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
    height: '100%',
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  profileImage: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 20,
    marginLeft: 10,
    alignSelf: 'center'
  },
  placeholderText: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
  },
  
})

export default EditarPerfil