import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 75,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    username: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    flexOne: {
        flex: 1,
    },
    backButton: {
        margin: 10,
        alignSelf: 'flex-start',
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
    offerContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    offerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    offerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    acceptButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    declineButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    acceptButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    declineButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;