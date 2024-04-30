import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRoute } from '@react-navigation/native';
import { format, parseISO, isSameDay } from 'date-fns';


const MensajesChat = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const route = useRoute();
    const { chatId, productId, authorId, receiverId, receiverUsername } = route.params;

    useEffect(() => {
        const websocketURL = `ws://51.44.17.164/ws/${authorId}/chat/messages/`;
        const newSocket = new WebSocket(websocketURL);

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
            fetchInitialMessages();
        };

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message_text) {
                setMessages(prev => [...prev, {
                    text: data.message_text,
                    sender: 'user',
                    timestamp: new Date().toISOString()
                }]);
            } else {
                console.error('Message missing timestamp or text:', data);
            }
        };

        newSocket.onerror = error => {
            console.error('WebSocket error:', error);
            Alert.alert("Error", "Unable to connect to chat service.");
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(newSocket);
        return () => newSocket.close();
    }, [authorId, chatId]);

    const fetchInitialMessages = async () => {
        const url = `http://51.44.17.164/chats/rooms/${chatId}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Failed to fetch chat messages: ' + response.statusText);
            }
            setMessages(data.map(msg => ({
                ...msg,
                sender: msg.author.id === authorId ? 'user' : 'server',
                timestamp: msg.sent_date

            })));
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert("Error", "Failed to load chat history.");
        }
    };

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
                        placeholder="Type a message"
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 75,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    username: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    flexOne: {
        flex: 1,
    },
    backButton: {
        margin: 10,
        alignSelf: 'flex-start',
        marginRight: 65,
    },
    messagesContainer: {
        flexGrow: 1,
        padding: 10,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#249050',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
    },
    messageText: {
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#18E19A',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
        fontSize: 18,
    },
    sendButton: {
        padding: 10,
    },
    dateHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        width: '100%',
    },
    timestamp: {
        fontSize: 12,
        opacity: 0.6,
        textAlign: 'right',
        marginTop: 4,
    },
});

export default MensajesChat;