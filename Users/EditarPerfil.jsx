import { View, Text, StyleSheet, Image } from 'react-native'
import FormData from "form-data"
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants/theme'
import { Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { submitPerfil } from '../api_service/ApiEditarPerfil'
import styles from '../styles/editarPerfil.style'

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
    <SafeAreaView style={styles.top}>
      <View style={styles.vista}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: imageUri }}
            style={styles.profileImage}
          />
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
            placeholder='
                        Breu descripció'
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
    </SafeAreaView>
  )
}
export default EditarPerfil