import React, { useState, useEffect } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [selected, setSelected] = useState('');
    const [data, setData] = useState([]);
    const [imageUri, setImageUri] = useState(null);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const resetForm = () => {
        setSelected('');
        setImageUri(null);
        setProductName('');
        setProductDescription('');
        setQuantity('');
        setPrice('');
    };

    useEffect(() => {
        // Get Values from database
        fetch('http://13.39.109.155/products/types/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON data
            })
            .then(data => {
                // Store Values in Temporary Array
                let newArray = data.map(item => {
                    return { key: item.id, value: item.name };
                });
                // Set Data Variable
                setData(newArray);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const handleAddProduct = () => {
        const productData = {
            name: productName,
            description: productDescription,
            type: selected,
            quantity: quantity,
            price: price,
            imageUri: imageUri,
        };

        fetch('http://13.39.109.155/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                Alert.alert('Producte afegit', 'El producte afegit correctament');
                resetForm();
            })
            .catch((error) => {
                console.error('Error:', error);
                Alert.alert('Error', 'Hi ha hagut un problema en afegir el producte');
            });
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const removeImage = () => {
        Alert.alert('Eliminar imatge', 'Estàs segur?', [
            { text: 'Eliminar', onPress: () => setImageUri(null) },
            { text: 'Cancel·lar', style: 'cancel' },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Afegir Producte</Text>
                <InputField label="Nom del producte:" value={productName} onChangeText={setProductName} />
                <InputField label="Descripció:" multiline numberOfLines={4} value={productDescription} onChangeText={setProductDescription} />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tipus:</Text>
                    <SelectList setSelected={setSelected} data={data} boxStyles={styles.dropdown} dropdownStyles={styles.dropdown} search={true} />
                </View>
                <InputField label="Quantitat disponible:" keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
                <InputField label="Preu per kg:" keyboardType="numeric" value={price} onChangeText={setPrice} />
                <ImagePickerComponent imageUri={imageUri} pickImage={pickImage} removeImage={removeImage} />
                <TouchableOpacity style={styles.submitButton} onPress={handleAddProduct}>
                    <Text style={styles.buttonText}>Afegir producte</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const InputField = ({ label, multiline, numberOfLines, ...props }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        {multiline ? (
            <ScrollView style={styles.multilineInputScroll} persistentScrollbar={true}>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical="top"
                    {...props}
                />
            </ScrollView>
        ) : (
            <TextInput
                style={styles.input}
                multiline={multiline}
                numberOfLines={numberOfLines}
                {...props}
            />
        )}
    </View>
);

const ImagePickerComponent = ({ imageUri, pickImage, removeImage }) => (
    <View style={styles.imagePickerContainer}>
        {!imageUri ? (
            <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                <FontAwesomeIcon icon={faCamera} size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Insertar imatge</Text>
            </TouchableOpacity>
        ) : (
            <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
                    <FontAwesomeIcon icon={faTrash} size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefae0',
    },
    scrollView: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#315220',
        marginVertical: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        color: '#315220',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#bc6c25',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        height: 40,
        textAlignVertical: 'top',
    },
    multilineInput: {
        height: 120,
        paddingTop: 10,
        paddingBottom: 10,
    },
    multilineInputScroll: {
        maxHeight: 150,
    },
    dropdown: {
        borderColor: '#bc6c25',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        maxHeight: 140,
    },
    imagePickerContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    imageButton: {
        backgroundColor: '#315220',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: '#bc6c25',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 70,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    removeButton: {
        marginLeft: 10,
        backgroundColor: '#E53935',
        padding: 10,
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
});
export default Home;
