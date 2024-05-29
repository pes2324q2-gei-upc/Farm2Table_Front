import React, { useEffect, useState, useCallback, useRef } from 'react';
import { SafeAreaView, Alert, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../navigation/header';
import { getPalabra, userId as fetchUserId } from '../informacion/User';
import { fetchChats, deleteChat } from "../api_service/ApiChat";
import SwipeableRow from '../components/swipeableRow';
import styles from "../styles/chat.style";

const Chat = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const initUserId = fetchUserId();
        if (initUserId) {
            setUserId(initUserId);
        }
    }, []);

    const loadData = useCallback(async () => {
        if (userId) {
            setLoading(true);
            try {
                const data = await fetchChats(userId);
                const sortedData = data.sort((a, b) => new Date(b.last_message.sent_date) - new Date(a.last_message.sent_date));
                setChats(sortedData);
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
                }
            } catch (error) {
                Alert.alert('Error', getPalabra("errorChat"));
            } finally {
                setLoading(false);
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
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('MensajesChat', {
                chatId: item.id,
                productId: item.product.id,
                authorId: userId,
                receiverId: (userId !== item.user1.id ? item.user1.id : item.user2.id),
                receiverUsername: (userId !== item.user1.id ? item.user1.username : item.user2.username),
                productName: item.product.name,
                productorId: item.user2.id,
                productorName: item.user2.username,
                productorAvatar: item.user2.avatar,
            })}
            onDelete={(chatId) => confirmDelete(chatId)}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView
                    style={styles.containerIn}
                    ref={scrollViewRef}
                >
                    {chats.length === 0 ? (
                        <View style={styles.noChatsContainer}>
                            <Text style={styles.noChat}>{getPalabra("noChats")}</Text>
                        </View>
                    ) : (
                        chats.map((chat) => renderItem({ item: chat }))
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default Chat;
