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
import { getToken, setToken } from '../informacion/Constants';
import { getMatchPhrase, loginInService } from '../api_service/API_ServeiExtern';
import { userType } from '../informacion/User';
import addToCart from "../api_service/CartService";

const MensajesChat = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offerQuantity, setOfferQuantity] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const route = useRoute();
    const { chatId, productId, authorId, receiverId, receiverUsername, productName, productorId, productorName, productorAvatar } = route.params;
    const [isSendingMessage, setIsSendingMessage] = useState(true);

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

    const sendMessage = async () => {
        if (socket) {
            if (message.trim() && !offerPrice && !offerQuantity) {
                socket.send(JSON.stringify({
                    product_id: productId,
                    author_id: authorId,
                    message_text: message,
                    receiver_id: receiverId,
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
                Alert.alert("Error", "Error");
            }

            if (userType() !== "Productor") {
                try {
                    const info_login = await loginInService();
                    setToken(info_login.token);
                    let tok = info_login.token;
                    const token = getToken();
                    const data = await getMatchPhrase(message, tok, receiverId);
                    if (data !== "Error: Not Found") {
                        socket.send(JSON.stringify({
                            product_id: productId,
                            author_id: receiverId,
                            message_text: data,
                            receiver_id: authorId,
                        }));
                        setMessage('');
                    }
                } catch (error) {
                    console.log("No existe la frase");
                }
            }
        }
    };

    const handleAcceptOffer = (price, quantity) => {
        Alert.alert(
            getPalabra("accept_offer"),
            getPalabra("accept_message"),
            [
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            addToCart(productId, productName, price, quantity, productorId, productorName, productorAvatar);
                            await deleteChat(chatId);
                        } catch (error) {
                            Alert.alert("Error", getPalabra("borrar_xat"));
                            return;
                        }
                        navigation.goBack();
                    }
                },
                {
                    text: getPalabra("cancel"),
                    style: "cancel"
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
                },
                {
                    text: getPalabra("cancel"),
                    style: "cancel"
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
            { msg.offer && msg.sender === 'server' ? (
                <View style={styles.offerContainer}>
                    <Text style={styles.offerText}>{msg.text}</Text>
                    <Text style={styles.timestamp}>{format(parseISO(msg.timestamp), 'p')}</Text>
                    <View style={styles.offerButtons}>
                        <TouchableOpacity onPress={() => handleAcceptOffer(msg.offer_price, msg.offer_quantity)} style={styles.acceptButton}>
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
                    {authorId === productorId ? (
                        isSendingMessage ? (
                            <TextInput
                                style={styles.input}
                                placeholder={getPalabra("type_message")}
                                onChangeText={setMessage}
                                value={message}
                                multiline
                                autoFocus
                            />
                        ) : (
                            <>
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
                            </>
                        )
                    ) : (
                        <TextInput
                            style={styles.input}
                            placeholder={getPalabra("type_message")}
                            onChangeText={setMessage}
                            value={message}
                            multiline
                            autoFocus
                        />
                    )}
                    {authorId === productorId && (
                        <TouchableOpacity onPress={() => setIsSendingMessage(!isSendingMessage)} style={styles.toggleButton}>
                            <Text>{isSendingMessage ? getPalabra("enviar_oferta") : getPalabra("enviar_missatge")}</Text>
                        </TouchableOpacity>
                    )}
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
