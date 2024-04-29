import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';
import Header from '../navigation/header';
import MensajesChat from './MensajesChat';
import {getPalabra, userId as fetchUserId} from '../informacion/User';
import {fetchChats} from "../api_service/ApiChat";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setUserId(fetchUserId());
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;
      try {
        const data = await fetchChats(userId);
        setChats(data);
      } catch (error) {
        console.error('Error loading chats:', error);
        Alert.alert('Error', getPalabra("errorChat"));
      }
    };
    loadData();
  }, [userId]);

  const renderItem = ({ item }) => (
      <TouchableOpacity
          onPress={() => navigation.navigate('MensajesChat', { chatId: item.id })}
          style={styles.chatItem}
      >
        <Image
            source={{ uri: item.product.image }}
            style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {(userId !== item.user1.id ? item.user1 : item.user2).username}
          </Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.last_message ? item.last_message.text : "No messages yet"}
          </Text>
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
