import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, URL } from '../constants/theme';
import Header from '../navigation/header';
import MensajesChat from './MensajesChat';
import {userId} from '../informacion/User';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const userId = "1"; // Assume the user ID is 1, replace with actual logic to determine user ID
  const API_CHATS = `http://${URL}/chats/${userId}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_CHATS);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };
    fetchData();
  }, [API_CHATS]);

  const renderItem = ({ item }) => (
      <TouchableOpacity
          onPress={() => navigation.navigate('MensajesChat', { chatId: item.id })}
          style={styles.chatItem}
      >
        <Image source={{ uri: item.product.image }} style={styles.image} />
        <View style={styles.textContainer}>
          {userId !== item.user1.id ? (
              <Text style={styles.name}>{item.user1.username}</Text>
          ) : (
              <Text style={styles.name}>{item.user2.username}</Text>
          )}
          <Text style={styles.lastMessage} numberOfLines={1}>{item.last_message || "No messages yet"}</Text>
        </View>
      </TouchableOpacity>
  );

  return (
      <SafeAreaView style={styles.container}>
        <Header/>
        <SafeAreaView style={styles.containerIn}>
          <FlatList
              data={chats}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  containerIn: {
    backgroundColor: COLORS.primary,
    flex: 1,
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
