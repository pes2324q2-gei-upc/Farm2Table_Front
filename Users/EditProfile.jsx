import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { getPalabra } from "../informacion/User";
import { COLORS, SIZES } from "../constants/theme";

import { submitPerfil } from "../api_service/ApiEditarPerfil";

import Header from "../navigation/header_back";
import styles from "../styles/editProfile.style";

const EditProfile = ({ route, navigation }) => {
    const userData = route.params.userData;
    
    const [profileImage, setProfileImage] = useState(userData.avatar || null);
    const [username, setUsername] = useState(userData.username || '');
    const [description, setDescription] = useState(userData.brief_description || '');
    const [aboutMe, setAboutMe] = useState(userData.about_me || '');
    const [phone, setPhone] = useState(userData.telephone || '');
    const [reach, setReach] = useState(userData.reach.toString() || '');
    const [address, setAddress] = useState(userData.address || '');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        } else {
            console.log('Image picking was canceled');
        }
    };

    const resetFields = () => {
        setUsername(userData.username || '');
        setDescription(userData.description || '');
        setAboutMe(userData.about_me || '');
        setPhone(userData.telephone || '');
        setReach(userData.reach || '');
        setAddress(userData.address || '');
        setProfileImage(userData.avatar || null);
    };

    const handleSave = async () => {
        if (!username.trim() || !description.trim() || !aboutMe.trim() || !phone.trim()) {
            Alert.alert('Error', 'Omple tots els camps.');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('brief_description', description);
        formData.append('about_me', aboutMe);
        formData.append('telephone', phone);
        formData.append('reach', reach);
        formData.append('address', address);

        if (profileImage) {
            const filename = profileImage.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;

            formData.append('avatar', {
                uri: profileImage,
                name: `photo.${match[1]}`,
                type: `image/${match[1]}`,
            });
        }

        try {
            await submitPerfil(formData, userData.id);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.outercontainer}>
            <Header />
            <ScrollView style={styles.container}>
                <View style={styles.profileContainer}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.avatar} />
                    ) : (
                        <TouchableOpacity onPress={pickImage} style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarPlaceholderText}>{getPalabra("add_Photo")}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={pickImage} style={styles.editButton}>
                        <Text style={styles.editButtonText}>{getPalabra("edit_photo")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("username")}</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder={getPalabra("placeholder_username")}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("description")}</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder={getPalabra("placeholder_description")}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("About_me")}</Text>
                    <TextInput
                        style={styles.input}
                        value={aboutMe}
                        onChangeText={setAboutMe}
                        placeholder={getPalabra("placeholder_about_me")}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("phone")}</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder={getPalabra("placeholder_phone")}
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("Reached")}</Text>
                    <TextInput
                        style={styles.input}
                        value={reach}
                        onChangeText={setReach}
                        placeholder={getPalabra("placeholder_reached")}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("Address")}</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder={getPalabra("placeholder_address")}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={resetFields} style={styles.button}>
                        <Text style={styles.buttonText}>{getPalabra("Reset")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>{getPalabra("save")}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
