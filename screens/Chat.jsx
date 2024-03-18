import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = { text: message, sender: 'user' };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((msg, index) => (
              <SafeAreaView key={index} style={[styles.messageBubble, msg.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
                <Text style={styles.messageText}>{msg.text}</Text>
              </SafeAreaView>
          ))}
        </ScrollView>

        <SafeAreaView style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Escriu un missatge"
              onChangeText={setMessage}
              value={message}
              multiline={true}
              autoFocus={true}
          />
          <TouchableOpacity onPress={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} size={35} color="#245414" />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 75,
  },
  messagesContainer: {
    flexGrow: 1,
    marginTop: 30,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    marginRight: 10,
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
    paddingVertical: 10,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default Chat;