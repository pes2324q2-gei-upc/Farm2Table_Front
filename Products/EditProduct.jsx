import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../styles/editProduct.style';
import HeaderBack from '../navigation/header_back';
import { getPalabra } from "../informacion/User";
import InputField from '../components/inputField';
import ImagePickerComponent from '../components/imagePicker';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { Picker } from '@react-native-picker/picker';
import { fetchProductTypes } from "../api_service/ApiAddProduct";
import { fetchProductInfo, putProductInfo, deleteProduct } from "../api_service/API_Productos";

const EditProduct = ({ navigation, route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [data, setData] = useState([]);
    const [imageUri, setImageUri] = useState(null);
    const [selected, setSelected] = useState(null);
    const [type, setType] = useState(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('Kg');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productData = await fetchProductInfo(productId);
                setProduct(productData);
                setProductName(productData.name);
                setProductDescription(productData.description);
                setQuantity(productData.quantity);
                setPrice(productData.price);
                setUnit(productData.unit);
                setSelected(productData.type);
                setType(productData.type);
                setImageUri(productData.image);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const fetchProductTipos = async () => {
            try {
                const data = await fetchProductTypes();
                setData(data);
            } catch (error) {
                Alert.alert('Error', getPalabra("unableProductTypes"));
            }
        };

        fetchProductTipos();
        fetchProductDetails();
    }, [productId]);

    const handleEditProduct = async () => {
        if (!productName || !productDescription || !selected || !quantity || !price || !unit) {
            Alert.alert('Error', getPalabra("fillFields"));
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        if(selected.key === undefined) { 
            formData.append('type', type.id);
        } else {
            formData.append('type', selected.key);
        }
        formData.append('unit', unit);
        formData.append('price', price);
        formData.append('quantity', quantity);

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
            await putProductInfo(productId, formData);
            Alert.alert(getPalabra("success"), getPalabra("updated_product"));
            navigation.goBack();
        } catch (error) {
            console.error("Error updating product details:", error);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(productId);
            Alert.alert(getPalabra("success"), getPalabra("deleted_product"));
            navigation.goBack();
        } catch (error) {
            console.error("Error deleting product:", error);
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

    if (!type) {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderBack />
                <View style={styles.background}>
                    <Text>{getPalabra("loading")}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack />
            <ScrollView style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <InputField label={getPalabra("nomProducte")} value={productName} onChangeText={setProductName} />
                    <InputField label={getPalabra("descripcio")} multiline numberOfLines={4} value={productDescription} onChangeText={setProductDescription} />
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{getPalabra("tipus")}</Text>
                        <SelectList
                            setSelected={(val) => setSelected(data.find(item => item.key === val))}
                            data={data}
                            boxStyles={styles.dropdown}
                            dropdownStyles={styles.dropdown}
                            search={true}
                            defaultOption={selected} // Display the selected type by default
                        />
                    </View>
                    <View style={styles.quantityUnitContainer}>
                        <View style={styles.quantityContainer}>
                            <Text style={styles.label}>{getPalabra("quantitat")}</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={quantity.toString()}
                                onChangeText={setQuantity}
                            />
                        </View>
                        <View style={styles.unitPickerContainer}>
                            <Picker
                                selectedValue={unit}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
                            >
                                <Picker.Item label="Kg" value="Kg" />
                                <Picker.Item label="g" value="grams" />
                            </Picker>
                        </View>
                    </View>
                    <InputField label={getPalabra("preuperkg")} keyboardType="numeric" value={price.toString()} onChangeText={setPrice} />
                    <ImagePickerComponent imageUri={imageUri} pickImage={pickImage} removeImage={removeImage} />
                    <TouchableOpacity style={styles.submitButton} onPress={handleEditProduct}>
                        <Text style={styles.buttonText}>{getPalabra("edit_product")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.deleteButton]} onPress={handleDeleteProduct}>
                        <Text style={styles.buttonText}>{getPalabra("delete_product")}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProduct;
