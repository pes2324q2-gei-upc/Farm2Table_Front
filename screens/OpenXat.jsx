import React from 'react';
import { View, Text } from 'react-native';
import WebSocket from './WebSocket'; // Asegúrate de importar desde la ubicación correcta

const ChatComponent = () => {
    WebSocket(); // Esto establece y maneja la conexión WebSocket

    return (
        <View>
            <Text>Chat App Component</Text>
        </View>
    );
};

export default ChatComponent;
