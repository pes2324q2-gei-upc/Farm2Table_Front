import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { Picker } from '@react-native-picker/picker';
import HeaderBack from '../navigation/header_back';
import { useNavigation } from '@react-navigation/native';
import { getPalabra, userId } from '../informacion/User';
import { fetchProductTypes, addNewProduct } from '../api_service/ApiAddProduct';
import styles from '../styles/addProduct.style';
import InputField from '../components/inputField';
import ImagePickerComponent from '../components/imagePicker';

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
        formData.append('id', userId());
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

export default AddProduct;
