import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {COLORS, SIZES, URL} from '../constants/theme';
import Header from '../navigation/header'
import MensajesChat from './MensajesChat'

const Chat = () => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const API_CHATS = "http://10.192.146.7:8000/chats/{id}/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_CHATS.replace("{id}", "1")); // Make sure to replace "your_id_here" with actual ID
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
      <TouchableOpacity
          onPress={() => navigation.navigate('MensajesChat', { item })} // Asegúrate de tener esta pantalla en tu navegación
          style={styles.chatItem}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
        </View>
      </TouchableOpacity>
  );

  return (
      <SafeAreaView style={styles.container}>
        <Header></Header>
        <FlatList
            data={chats}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cbc0bb",
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  lastMessage: {
    fontSize: SIZES.medium,
    color: "#cbc0bb",
    marginTop: 6,
  },
});

export default Chat;
