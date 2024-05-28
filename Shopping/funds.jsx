import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../navigation/header_back';
import { COLORS } from '../constants/theme';
import styles from '../styles/funds.style';
import { fetchUserFunds, fetchAddFunds } from '../api_service/API_funds';
import { userId } from '../informacion/User';
import { initial, now } from 'lodash';

const AddCoinsScreen = ({ navigation, route }) => {
  const { actualfunds } = route.params;
  const [currentCoins, setCurrentCoins] = useState(actualfunds);

  const addCoins = async (amount) => {
    const nowFunds = await fetchAddFunds(userId(), amount);
    setCurrentCoins(nowFunds);
  };

  const finishAdding = () => {
    navigation.goBack();
  };

  // Format the number to separate the digits and encapsulate each in a visual capsule
  const formatDigits = (number) => {
    let formatted = number.toString().padStart(5, '0');  // Ensure there are always 4 digits
    return formatted.split('').map((digit, index) => (
      <View key={index} style={styles.digitContainer}>
        <Text style={styles.digit}>{digit}</Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={{color: COLORS.secondary, fontSize: 34, fontWeight: 'bold', marginBottom: 20}}>Agregar Fondos</Text>
        <View style={styles.displayContainer}>
          {formatDigits(currentCoins)}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button_add} onPress={() => addCoins(5)}> 
            <Text style={styles.button_text}>+5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_add} onPress={() => addCoins(10)}> 
            <Text style={styles.button_text}>+10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_add} onPress={() => addCoins(100)}> 
            <Text style={styles.button_text}>+100</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button_end} onPress={finishAdding}> 
          <Text style={styles.button_text}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default AddCoinsScreen;
