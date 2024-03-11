import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if(message.trim() !== "") {
      const newMessage = {text: message, remit: 'user'};
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerMessage}>
          {messages.map((msg, index) => {
            return (
                <View key={index} style={[styles.bubbleMessage, msg.remit === 'user' ? styles.messageUser : styles.otherMessage]}>
                  <Text style={styles.textMessage}>{msg.text}</Text>
                </View>
            );
          })}
        </ScrollView>
        <View style={styles.containerEntrance}>
          <TextInput
              style={styles.entrance}
              placeholder="Put a message"
              onChangeText={setMessage}
              value={message}
              multiline={true}
              autoFocus={true}
          />
          <TouchableOpacity onPress={sendMessage}>
            <FontAwesomeIcon
                icon={faPaperPlane}
                size={35}
                color="#245414"
                style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 75,
  },
  containerMessage: {
    flexGrow: 1,
  },
  bubbleMessage: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    marginRight: 10,
  },
  messageUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#249050',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  textMessage: {
    fontSize: 18,
  },
  containerEntrance: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18E19A',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  entrance: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  icon: {
    marginHorizontal: 5,
  }
});

export default Chat