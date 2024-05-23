import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = forwardRef((props, ref) => {
    const navigation = useNavigation();
    const [cartCount, setCartCount] = useState(0); // Estado para el contador del carrito
    const scale = useRef(new Animated.Value(1)).current; // Valor animado para la escala
    const [cartColor, setCartColor] = useState(COLORS.primary);

    // Permite al componente padre interactuar con la animación y el contador
    useImperativeHandle(ref, () => ({
        incrementCartCount: () => {
            setCartCount(cartCount + 1);
            triggerCartAnimation();
        },
        resetCartCount: () => {
            setCartCount(0);
        },
        triggerCartAnimation() {
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.5,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start();
            setCartColor(COLORS.tertiary);
            setTimeout(() => {
                setCartColor(COLORS.primary); // Revertir el color después de 1 segundo
            }, 1000);
        }
    }));
    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleCartPress = () => {
        navigation.navigate('CartScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
                </TouchableOpacity>
                <FontAwesome5 name="tractor" size={44} color="white" />
                <TouchableOpacity onPress={handleCartPress}>
                    <Animated.View style={{ transform: [{ scale }] }}>
                        <Ionicons name="cart" size={35} color={cartColor} style={styles.settingsIcon} />
                        {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
                    </Animated.View>
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

export default Header;
