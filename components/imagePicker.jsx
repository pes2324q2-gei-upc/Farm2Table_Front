import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/addProduct.style';
import { getPalabra } from '../informacion/User';

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

export default ImagePickerComponent;
