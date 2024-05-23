import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from '../styles/addProduct.style';

const InputField = ({ label, multiline, numberOfLines, ...props }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        {multiline ? (
            <ScrollView style={styles.multilineInputScroll} persistentScrollbar={true}>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical="top"
                    {...props}
                />
            </ScrollView>
        ) : (
            <TextInput
                style={styles.input}
                multiline={multiline}
                numberOfLines={numberOfLines}
                {...props}
            />
        )}
    </View>
);

export default InputField;
