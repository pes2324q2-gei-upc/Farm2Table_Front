import React, { useEffect, useState, useCallback, useRef } from 'react';
import { SafeAreaView, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../navigation/header';
import { getPalabra, userId as fetchUserId } from '../informacion/User';
import { fetchChats, deleteChat } from "../api_service/ApiChat";
import SwipeableRow from '../components/swipeableRow';
import styles from "../styles/chat.style";

const Chat = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(null);
    const scrollViewRef = useRef(null);

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
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
                }
            } catch (error) {
                Alert.alert('Error', getPalabra("errorChat"));
            }
        }
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const handleDelete = async (chatId) => {
        try {
            await deleteChat(chatId);
            setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
        } catch (error) {
            Alert.alert('Error', getPalabra("errorDeleteChat"));
        }
    };

    const confirmDelete = (chatId) => {
        Alert.alert(
            getPalabra("confirmeliminar"),
            getPalabra("segeliminar"),
            [
                {
                    text: getPalabra("cancel"),
                    style: "cancel"
                },
                {
                    text: getPalabra("remove"),
                    onPress: () => handleDelete(chatId),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }) => (
        <SwipeableRow
            item={item}
            onPress={() => navigation.navigate('MensajesChat', {
                chatId: item.id,
                productId: item.product.id,
                authorId: userId,
                receiverId: (userId !== item.user1.id ? item.user1.id : item.user2.id),
                receiverUsername: (userId !== item.user1.id ? item.user1.username : item.user2.username)
            })}
            onDelete={(chatId) => confirmDelete(chatId)}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView
                style={styles.containerIn}
                ref={scrollViewRef}
            >
                {chats.map((chat) => renderItem({ item: chat }))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Chat;
