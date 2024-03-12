
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from 'react-native-elements';
import { loadImageFromGallery } from './Auxiliar';

const Home = () => {
    const [selected, setSelected] = useState('');
    const [imagesSelected, setImagesSelected] = useState([]);

    const data = [
        { key: '1', value: 'Jammu & Kashmir' },
        { key: '2', value: 'Gujrat' },
        { key: '3', value: 'Maharashtra' },
        { key: '4', value: 'Goa' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.name}>Nom del producte: </Text>
                <TextInput style={styles.writeName} />
            </View>
            <View style={styles.row}>
                <Text style={styles.name}>Tipus: </Text>
                <SelectList boxStyles={styles.list} setSelected={setSelected} data={data} save='value' />
            </View>
            {uploadImage({ imagesSelected, setImagesSelected })}
        </SafeAreaView>
    );
};

const uploadImage = ({ imagesSelected, setImagesSelected }) => {
    const imageSelected = async () => {
        const RESPONSE = await loadImageFromGallery([4, 3]);
        console.log(RESPONSE); // Afegit per solucionar problemes
        if (!RESPONSE.status) {
            Alert.alert('Error', "No s'ha pogut carregar la imatge.");
            return;
        }
        const newImagesSelected = [...imagesSelected, RESPONSE.image];
        setImagesSelected(newImagesSelected);
        console.log(newImagesSelected); // Comprovar l'estat actualitzat
    };

    return (
        <ScrollView horizontal style={styles.viewImage}>
            {imagesSelected.length < 10 && (
                <TouchableOpacity onPress={imageSelected}>
                    <FontAwesomeIcon icon={faCamera} size={35} color='#245414' style={styles.containerIcon} />
                </TouchableOpacity>
            )}
            {imagesSelected.map((imageProducte, index) => (
                <Avatar key={index} style={styles.miniatures} source={{ uri: imageProducte }} />
            ))}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 75,
    },
    name: {
        color: '#20232a',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    writeName: {
        marginLeft: 10,
        height: 40,
        borderWidth: 1,
        width: '60%',
    },
    row: {
        flexDirection: 'row',
        marginVertical: 30,
        marginLeft: 50,
    },
    list: {
        marginLeft: 10,
        width: 400,
    },
    viewImage: {
        flexDirection:"row",
        marginHorizontal: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems:"center",
        justifyContent:"center",
        marginRight: 10,
        height: 70,
        width: 70,
    },
    miniatures: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
});

export default Home