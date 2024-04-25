import React, { useState, useEffect } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Picker } from '@react-native-picker/picker';
import HeaderBack from '../navigation/header_back';
import { COLORS, URL } from '../constants/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
//import {userId} from "../informacion/User";
import { getPalabra } from '../informacion/User';
import { fetchProductTypes, addNewProduct } from '../api_service/ApiAddProduct';


const AddProduct = () => {
    const [selected, setSelected] = useState('');
    const [data, setData] = useState([]);
    const [imageUri, setImageUri] = useState(null);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('Kg');
    const navigation = useNavigation();


    const resetForm = () => {
        setSelected('');
        setImageUri(null);
        setProductName('');
        setProductDescription('');
        setQuantity('');
        setPrice('');
        setUnit('Kg');
    };

    useEffect(() => {
        // Get Values from database using the new service
        fetchProductTypes()
            .then(setData)
            .catch(error => {
                Alert.alert('Error', getPalabra("unableProductTypes"));
            });
    }, []);

    const handleAddProduct = async () => {
        if (!productName.trim() || !productDescription.trim() || !selected || !quantity.trim() || !price.trim() || !unit.trim()) {
            Alert.alert('Error', getPalabra("fillFields"));
            return;
        }

        const formData = new FormData();
        formData.append('id', '1');
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('type', selected);
        formData.append('unit', unit);
        formData.append('price', price.toString());
        formData.append('quantity', quantity.toString());

        if (imageUri) {
            const uriParts = imageUri.split('.');
            const fileType = uriParts[uriParts.length - 1];
            formData.append('image', {
                uri: imageUri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
        }

        try {
            const data = await addNewProduct(formData);
            Alert.alert(getPalabra("success"), getPalabra("addedProduct"));
            resetForm();
            navigation.goBack({ productAdded: true });
        } catch (error) {
            Alert.alert('Error', error.message);
        }
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
        Alert.alert(getPalabra("removeImage"), getPalabra("sure"), [
            { text: getPalabra("remove"), onPress: () => setImageUri(null) },
            { text: getPalabra("cancel"), style: 'cancel' },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack />
            <ScrollView style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>{getPalabra("afegirProducte")}</Text>
                <InputField label={getPalabra("nomProducte")} value={productName} onChangeText={setProductName} />
                <InputField label={getPalabra("descripcio")} multiline numberOfLines={4} value={productDescription} onChangeText={setProductDescription} />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{getPalabra("tipus")}</Text>
                    <SelectList setSelected={setSelected} data={data} boxStyles={styles.dropdown} dropdownStyles={styles.dropdown} search={true} />
                </View>
                <View style={styles.quantityUnitContainer}>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.label}>{getPalabra("quantitat")}</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                    </View>
                    <View style={styles.unitPickerContainer}>
                        <Picker
                            selectedValue={unit}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                setUnit(itemValue)
                            }>
                            <Picker.Item label="Kg" value="Kg" />
                            <Picker.Item label="g" value="grams" />
                        </Picker>
                    </View>
                </View>
                <InputField label={getPalabra("preuperkg")} keyboardType="numeric" value={price} onChangeText={setPrice} />
                <ImagePickerComponent imageUri={imageUri} pickImage={pickImage} removeImage={removeImage} />
                <TouchableOpacity style={styles.submitButton} onPress={handleAddProduct}>
                    <Text style={styles.buttonText}>{getPalabra("afegirProducte")}</Text>
                </TouchableOpacity>
            </ScrollView>
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
                <Text style={styles.buttonText}>{getPalabra("inserirImatge")}</Text>
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
    background: {
        backgroundColor: '#fefae0',
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    scrollView: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 5,
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
        marginVertical: 20,
    },
    submitButton: {
        backgroundColor: '#bc6c25',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
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
        marginTop: 5,
    },
    quantityUnitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        width: '90%',
    },
    quantityContainer: {
        flex: 1,
        marginRight: 10,
        width: '70%',
    },
    unitPickerContainer: {
        width: '30%',
        height: '300%',
    },
    picker: {
        width: 100,
        height: 40,
    },
});
export default AddProduct;
