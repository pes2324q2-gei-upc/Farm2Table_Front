import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import styles from "../styles/mensajesChat.style";
import { getPalabra } from '../informacion/User';
import { URL } from "../constants/theme";
import { fetchInitialMessages, initializeWebSocket } from '../api_service/ApiChat';

const MensajesChat = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const route = useRoute();
    const { chatId, productId, authorId, receiverId, receiverUsername } = route.params;

    useEffect(() => {
        const cleanupWebSocket = initializeWebSocket(URL, authorId, () => fetchInitialMessages(chatId, authorId).then(setMessages), setMessages, setSocket);
        return cleanupWebSocket;
    }, [authorId, chatId]);

    const sendMessage = () => {
        if (message.trim() && socket) {
            socket.send(JSON.stringify({
                product_id: productId,
                author_id: authorId,
                message_text: message,
                receiver_id: receiverId,
            }));
            setMessage('');
        }
    };

    const groupedMessages = messages.reduce((acc, message) => {
        if (message.timestamp) {
            const date = format(parseISO(message.timestamp), 'yyyy-MM-dd');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(message);
        } else {
            console.warn('Message without a timestamp:', message);
        }
        return acc;
    }, {});

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" || Platform.OS === "android" ? "padding" : "height"}
                style={styles.flexOne}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.username}>{receiverUsername}</Text>
                    <View style={styles.backButton} />
                </View>
                <ScrollView contentContainerStyle={styles.messagesContainer}>
                    {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                        <View key={date}>
                            <Text style={styles.dateHeader}>{format(parseISO(date), 'PPP')}</Text>
                            {dateMessages.map((msg, index) => (
                                <View key={index} style={[styles.messageBubble, msg.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
                                    <Text style={styles.messageText}>{msg.text}</Text>
                                    <Text style={styles.timestamp}>{format(parseISO(msg.timestamp), 'p')}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={getPalabra("type_message")}
                        onChangeText={setMessage}
                        value={message}
                        multiline
                        autoFocus
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <FontAwesomeIcon icon={faPaperPlane} size={24} color="#245414" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MensajesChat;
