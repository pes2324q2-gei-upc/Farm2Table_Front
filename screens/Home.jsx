import React, { useState } from 'react';
import { Modal, TouchableOpacity, Text, Button, ScrollView, SafeAreaView, StyleSheet, View, Image, TextInput, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';

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
            "¿Estás seguro de que quieres eliminar esta imagen?",
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
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.name}>Nom del producte:</Text>
                <TextInput style={styles.writeName} />
            </View>
            <View style={styles.row}>
                <Text style={styles.name}>Tipus:</Text>
                <SelectList boxStyles={styles.list} setSelected={setSelected} data={data} save='value' />
            </View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an image from camera roll</Text>
            </TouchableOpacity>
            <ScrollView horizontal={true} style={styles.imageScroll}>
                {images.map((img, index) => (
                    <TouchableOpacity key={index} onPress={() => removeImage(index)} style={styles.imageContainer}>
                        <Image source={{ uri: img }} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 75,
        marginTop: 20,
        marginLeft: 15,
    },
    name: {
        color: '#20232a',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 2,
    },
    writeName: {
        marginLeft: 10,
        height: 40,
        borderWidth: 1,
        width: '40%',
    },
    row: {
        flexDirection: 'row',
        marginVertical: 30,
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
});

export default Home;
