import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <TouchableOpacity onPress={handleBackPress}>
                <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
            </TouchableOpacity>
                <FontAwesome5 name="tractor" size={44} color="white" />
                <TouchableOpacity>
                    <Ionicons
                        name="settings"
                        size={35}
                        color="white"
                        style={styles.settingsIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: -10,
        maxHeight: 150,
        backgroundColor: COLORS.secondary,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    backIcon: {
        marginLeft: 10,
    },
    logo: {
        marginLeft: 20,
    },
    settingsIcon: {
        marginRight: 10,
    },
});

export default Header;
