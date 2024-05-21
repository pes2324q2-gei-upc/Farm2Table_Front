import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../Chat/Chat';
import MensajesChat from '../Chat/MensajesChat';
import OpenChat from '../Chat/OpenChat';

const ChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator
            initialRouteName="Chat"
            screenOptions={{ headerShown: false }}>
            <ChatStack.Screen name="Chat" component={Chat} />
            <ChatStack.Screen name="MensajesChat" component={MensajesChat} />
            <ChatStack.Screen name="OpenChat" component={OpenChat} />
        </ChatStack.Navigator>
    );
};
export default ChatStackScreen;
