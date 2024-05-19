import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { getPalabra } from "../informacion/User";
import { COLORS, SIZES } from "../constants/theme";

import Header from "../navigation/header_back";

const EditProfile = ({ route }) => {
    const userData = route.params.userData
    console.log(userData);
    
    const [profileImage, setProfileImage] = useState(userData.avatar || null);
    const [username, setUsername] = useState(userData.username || '');
    const [description, setDescription] = useState(userData.description || '');
    const [aboutMe, setAboutMe] = useState(userData.about_me || '');
    const [phone, setPhone] = useState(userData.telephone || '');
    const [reach, setReach] = useState(userData.reach || '');
    const [address, setAddress] = useState(userData.address || '');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfileImage(result.uri);
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

    return (
        <SafeAreaView style={styles.outercontainer}>
            <ScrollView style={styles.container}>
                <View style={styles.profileContainer}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.avatar} />
                    ) : (
                        <TouchableOpacity onPress={pickImage} style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarPlaceholderText}>Add Photo</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={pickImage} style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("Username")}</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter your username"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("Description")}</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter a short description"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("About Me")}</Text>
                    <TextInput
                        style={styles.input}
                        value={aboutMe}
                        onChangeText={setAboutMe}
                        placeholder="Tell something about yourself"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("Phone")}</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("Reach")}</Text>
                    <TextInput
                        style={styles.input}
                        value={reach}
                        onChangeText={setReach}
                        placeholder="Enter your reach"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>{getPalabra("Address")}</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter your address"
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={resetFields} style={styles.button}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    outercontainer: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: COLORS.tertiary,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tertiary,
    },
    avatarPlaceholderText: {
        color: COLORS.primary,
        fontSize: 16,
    },
    editButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
    },
    editButtonText: {
        color: COLORS.primary,
        fontSize: 14,
    },
    fieldContainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EditProfile;
