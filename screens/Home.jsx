import React, { useState } from 'react';
import { TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet, View, Image, TextInput, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const [selected, setSelected] = useState('');
    const [images, setImages] = useState([]);

    const data = [
        { key: '1', value: 'Jammu & Kashmir' },
        { key: '2', value: 'Gujrat' },
        { key: '3', value: 'Maharashtra' },
        { key: '4', value: 'Goa' },
    ];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
        }
    };

    const removeImage = (index) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estàs segur?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar", onPress: () => {
                        let newImages = [...images];
                        newImages.splice(index, 1);
                        setImages(newImages);
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.name}>Nom del producte:</Text>
                <TextInput style={styles.writeName} />
            </View>
            <View style={styles.row}>
                <Text style={styles.name}>Descripció:</Text>
                <TextInput style={styles.writeName} />
            </View>
            <View style={styles.row}>
                <Text style={styles.name}>Tipus:</Text>
                <SelectList boxStyles={styles.list} setSelected={setSelected} data={data} save='value' />
            </View>
            <View style={styles.row}>
                <Text style={styles.name}>Quantitat disponible:</Text>
                <TextInput style={styles.writeName} />
            </View>
            <View style={styles.row}>
                <Text style={styles.name}>Preu</Text>
                <TextInput style={styles.writeName} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Text style={styles.nameButton}>Inserir imatge</Text>
                    <FontAwesomeIcon icon={faCamera} size={30} color="#bc6c25" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} style={styles.imageScroll}>
                {images.map((img, index) => (
                    <TouchableOpacity key={index} onPress={() => removeImage(index)} style={styles.imageContainer}>
                        <Image source={{ uri: img }} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Text style={styles.nameButton}>Afegir producte</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 75,
        marginTop: 20,
        backgroundColor: "#fefae0",
    },
    name: {
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
    },
    nameButton: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: 'bold',
    },
    writeName: {
        marginLeft: 10,
        height: 40,
        borderWidth: 1,
        width: '40%',
        color: "#ffffff",
    },
    row: {
        flexDirection: 'row',
        marginVertical: 20,
        marginLeft: 15,
        backgroundColor: "#315220",
        width: '80%',
        padding: 10,
        borderRadius: 10,
    },
    list: {
        marginLeft: 10,
        width: 200,
    },
    imageScroll: {
        height: 100,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    imageContainer: {
        position: 'relative',
    },
    icon: {
        marginLeft: 10,
    },
    button: {
        marginLeft: 15,
        backgroundColor: "#315220",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
    },
    buttonContainer: {
        justifyContent: 'center', // Centra el contenido a lo largo del eje principal (horizontal en este caso)
        alignItems: 'center', // Centra el contenido a lo largo del eje cruzado (vertical en este caso)
        width: '100%', // Asegura que el contenedor ocupe el ancho completo
    },
});

export default Home;
