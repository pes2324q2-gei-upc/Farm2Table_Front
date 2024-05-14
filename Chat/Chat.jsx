import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';
import Header from '../navigation/header';
import MensajesChat from './MensajesChat';
import { getPalabra, userId as fetchUserId } from '../informacion/User';
import { fetchChats } from "../api_service/ApiChat";
import styles from "../styles/chat.style";

const Chat = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const initUserId = fetchUserId();
        if (initUserId) {
            setUserId(initUserId);
        }
    }, []);

    const loadData = useCallback(async () => {
        if (userId) {
            try {
                const data = await fetchChats(userId);
                setChats(data);
            } catch (error) {
                console.error('Error loading chats:', error);
                Alert.alert('Error', getPalabra("errorChat"));
            }
        }
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('MensajesChat', {
                chatId: item.id,
                productId: item.product.id,
                authorId: userId,
                receiverId: (userId !== item.user1.id ? item.user1.id : item.user2.id),
                receiverUsername: (userId !== item.user1.id ? item.user1.username : item.user2.username)
            })}
            style={styles.chatItem}
        >
            <Image
                source={{ uri: item.product.image }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>
                    {(userId !== item.user1.id ? item.user1 : item.user2).username + ', ' + item.product.name}
                </Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.last_message ? item.last_message.text : ""}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
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

export default Chat;
