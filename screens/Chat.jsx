import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';
import Header from '../navigation/header'
import MensajesChat from './MensajesChat'

const Chat = () => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fakeChatsData = [
      {
        id: '1',
        imageUrl: 'https://via.placeholder.com/150',
        name: 'Nikita Mazepin',
        lastMessage: 'Я хочу, чтобы ему подарили 33...',
      },
      {
        id: '2',
        imageUrl: 'https://via.placeholder.com/150',
        name: 'Mike Krack',
        lastMessage: 'I need 33 carrots to make strol...',
      },
      {
        id: '3',
        imageUrl: 'https://via.placeholder.com/150',
        name: 'Dan Fallows',
        lastMessage: 'Only 33 eggs?',
      },
      {
        id: '4',
        imageUrl: 'https://via.placeholder.com/150',
        name: 'Fernando Alonso',
        lastMessage: 'Si te compro 33 cebollas por 33€ m...',
      },
      {
        id: '5',
        imageUrl: 'https://via.placeholder.com/150',
        name: 'Sir Lewis Carl Davidson...',
        lastMessage: 'I want 33 steaks for dog Roscoe.',
      },
      {
        id: '6',
        imageUrl: 'https://via.placeholder.com/150',
        name: 'Flavio Briatore',
        lastMessage: 'Con 33 manzada posso restare...',
      },
      {
        id: '7',
        imageUrl: 'https://via.placeholder.com/150',
        name: 'Lance Stroll',
        lastMessage: 'With your chesse would I be able to...',
      },
    ];
    setChats(fakeChatsData);
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
