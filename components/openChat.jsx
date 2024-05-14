import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const OpenChat = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <FontAwesomeIcon icon={faComments} size={24} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: -150, // Ajustado por la altura del pie de página
        left: 320,
        backgroundColor: COLORS.tertiary,
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default OpenChat;
