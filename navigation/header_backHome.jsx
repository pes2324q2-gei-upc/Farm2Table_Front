import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderHome = forwardRef((props, ref) => {
    const navigation = useNavigation();
    const scale = useRef(new Animated.Value(1)).current; // Valor animado para la escala

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
                </TouchableOpacity>
                <FontAwesome5 name="tractor" size={44} color="white" />
                <TouchableOpacity onPress={handleHomePress}>
                    <Ionicons name="home" size={28} color="white" style={styles.settingsIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
});

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
    settingsIcon: {
        marginRight: 10,
    },
    cartCount: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        color: 'white',
        paddingHorizontal: 4,
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 'bold',
        overflow: 'hidden'
    },
});

export default HeaderHome;
