import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import styles from "../styles/mensajesChat.style";
import { getPalabra } from '../informacion/User';
import { URL } from "../constants/theme";
import { fetchInitialMessages, initializeWebSocket, deleteChat, deleteMessage } from '../api_service/ApiChat';
const MensajesChat = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offerQuantity, setOfferQuantity] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const route = useRoute();
    const { chatId, productId, authorId, receiverId, receiverUsername } = route.params;

    useEffect(() => {
        const cleanupWebSocket = initializeWebSocket(
            URL,
            authorId,
            () => fetchInitialMessages(chatId, authorId).then(setMessages),
            setMessages,
            setSocket
        );
        return cleanupWebSocket;
    }, [authorId, chatId]);

    const sendMessage = () => {
        if (socket) {
            if (message.trim() && !offerPrice && !offerQuantity) {
                socket.send(JSON.stringify({
                    product_id: productId,
                    author_id: authorId,
                    message_text: message,
                    receiver_id: receiverId,
                    oferta: false,
                    offer_price: "",
                    offer_quantity: ""
                }));
                setMessage('');
            } else if (offerPrice.trim() && offerQuantity.trim() && !message) {
                socket.send(JSON.stringify({
                    product_id: productId,
                    author_id: authorId,
                    message_text: `Oferta: ${offerPrice}€ por ${offerQuantity}kg`,
                    receiver_id: receiverId,
                    oferta: true,
                    offer_price: offerPrice,
                    offer_quantity: offerQuantity,
                }));
                setOfferPrice('');
                setOfferQuantity('');
            } else {
                Alert.alert("Error", "Debe llenar solo los campos de mensaje o de oferta, no ambos.");
            }
        }
    };

    const handleAcceptOffer = (offerId) => {
        Alert.alert(
            getPalabra("accept_offer"),
            getPalabra("accept_message"),
            [
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await deleteChat(chatId);
                        } catch (error) {
                            Alert.alert("Error", getPalabra("borrar_xat"));
                            return;
                        }
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    const handleDeclineOffer = (messageId) => {
        Alert.alert(
            getPalabra("decline_offer"),
            getPalabra("decline_message"),
            [
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await deleteMessage(messageId);
                            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
                        } catch (error) {
                            Alert.alert("Error", getPalabra("borrar_mensaje"));
                        }
                    }
                }
            ]
        );
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

    const renderMessage = (msg, index) => (
        <View key={index} style={[styles.messageBubble, msg.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
            {msg.offer && msg.sender === 'server' ? (
                <View style={styles.offerContainer}>
                    <Text style={styles.offerText}>{msg.text}</Text>
                    <Text style={styles.timestamp}>{format(parseISO(msg.timestamp), 'p')}</Text>
                    <View style={styles.offerButtons}>
                        <TouchableOpacity onPress={() => handleAcceptOffer(msg.id)} style={styles.acceptButton}>
                            <Text style={styles.acceptButtonText}>{getPalabra("accept")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeclineOffer(msg.id)} style={styles.declineButton}>
                            <Text style={styles.declineButtonText}>{getPalabra("decline")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
                    <Text style={styles.messageText}>{msg.text}</Text>
                    <Text style={styles.timestamp}>{format(parseISO(msg.timestamp), 'p')}</Text>
                </>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" || Platform.OS === "android" ? "padding" : "height"}
                style={styles.flexOne}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.username}>{receiverUsername}</Text>
                    <View style={styles.backButton} />
                </View>
                <ScrollView contentContainerStyle={styles.messagesContainer}>
                    {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                        <View key={date}>
                            <Text style={styles.dateHeader}>{format(parseISO(date), 'PPP')}</Text>
                            {dateMessages.map((msg, index) => renderMessage(msg, index))}
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
                    <TextInput
                        style={styles.input}
                        placeholder={getPalabra("offer_price")}
                        onChangeText={setOfferPrice}
                        value={offerPrice}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={getPalabra("offer_quantity")}
                        onChangeText={setOfferQuantity}
                        value={offerQuantity}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <Entypo name="paper-plane" size={24} color="#245414" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

MensajesChat.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default MensajesChat;
