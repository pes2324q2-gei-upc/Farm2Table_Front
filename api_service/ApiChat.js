import { URL } from '../constants/theme';
import { getPalabra } from '../informacion/User';
import { Alert } from 'react-native';

export const fetchInitialMessages = async (chatId, authorId) => {
    const url = `http://${URL}/chats/rooms/${chatId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch chat messages: ' + response.statusText);
        }
        return data.map(msg => ({
            ...msg,
            sender: msg.author.id === authorId ? 'user' : 'server',
            timestamp: msg.sent_date
        }));
    } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert("Error", getPalabra("load"));
        throw error;
    }
};

export const initializeWebSocket = (URL, authorId, fetchInitialMessages, setMessages, setSocket) => {
    const websocketURL = `ws://${URL}/ws/${authorId}/chat/messages/`;
    const newSocket = new WebSocket(websocketURL);

    newSocket.onopen = () => {
        console.log('WebSocket connection established');
        fetchInitialMessages();
    };

    newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.message_text) {
            fetchInitialMessages();
        } else {
            console.error('Message missing timestamp or text:', data);
        }
    };

    newSocket.onerror = error => {
        console.error('WebSocket error:', error);
        Alert.alert("Error", getPalabra("unable"));
    };

    newSocket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    setSocket(newSocket);
    return () => newSocket.close();
};

export const createSocketConnection = (authorId, onMessage) => {
    const websocketURL = `ws://${URL}/ws/${authorId}/chat/messages/`;
    const newSocket = new WebSocket(websocketURL);

    newSocket.onopen = () => {
        console.log('WebSocket connection established');
    };

    newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    newSocket.onerror = error => {
        console.error('WebSocket error:', error);
        Alert.alert("Error", getPalabra("unable"));
    };

    newSocket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return newSocket;
};

export const fetchChats = async (userId) => {
    try {
        const response = await fetch(`http://${URL}/chats/${userId}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteChat = async (chatId) => {
    try {
        const response = await fetch(`http://${URL}/chats/deleteChat/${chatId}/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
