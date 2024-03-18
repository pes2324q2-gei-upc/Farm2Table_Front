import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Image
                    source={require('../assets/images/149071.png')}
                    style={styles.profileImage}
                />
                <FontAwesome5 name="tractor" size={44} color="white" />
                <TouchableOpacity>
                    <Ionicons
                        name="settings"
                        size={24}
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
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    logo: {
        marginLeft: 20,
    },
    settingsIcon: {
        marginRight: 20,
    },
});

export default Header;
