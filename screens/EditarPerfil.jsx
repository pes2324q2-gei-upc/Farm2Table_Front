import { View, Text, StyleSheet, Image } from 'react-native'
import FormData from "form-data"
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES,URL } from '../constants/theme'
import { Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';


const API_ENDPOINT = "http://"+URL+"/users/profile/";

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
    console.log(API_ENDPOINT+item.id);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("brief_description", descripcio);
    formData.append("about_me", resum);
    formData.append("telephone", number);

    if(imageUri) {
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append("avatar", {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    try {
      const response = await fetch(API_ENDPOINT+item.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      });
      //console.log(response);
      const data = await response.json();
      if (!response.ok) {
        console.log('Product added successfully:', data);
        throw new Error('Something went wrong');
      }else{
        console.log('Product added successfully:', data);
        Alert.alert('Success', 'Profile changed successfully');
      }
    } catch (error) {
      console.log("hola");
      Alert.alert('Error', 'An error occurred while adding the product');
      console.log(error.message);
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
      setImageUri(result.uri);
    }
};
  /*
  const handleSubmit = async () => {
    console.log(API_ENDPOINT+item.id)
    console.log(username + ' ' + descripcio)
    try {
      const response = await fetch(API_ENDPOINT+item.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username,
          "brief_description": descripcio,
          "about_me": resum,
          "telephone": number,
          "avatar": image,
        }),
      });
      //console.log(response);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      /*
      setusername('');
      setdescripcio('');
      setresum('');
      setnumber('');
      // Handle the response here
      const data = await response.json();
      console.log(response);
      //console.log(data);
    } catch (error) {
      // Handle the error here
      console.log(error.message);
    }
  };
  */
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
    width:'25%',
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
    //backgroundColor: 'green',
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
})
export default EditarPerfil