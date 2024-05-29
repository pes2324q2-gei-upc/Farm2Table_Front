import {StyleSheet} from "react-native";
import {COLORS, SIZES} from "../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    containerIn: {
        backgroundColor: COLORS.primary,
        flex: 1,
        marginBottom: 50,
    },
    chatItem: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#cbc0bb",
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: SIZES.xlarge,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    lastMessage: {
        fontSize: SIZES.medium,
        color: "#cbc0bb",
        marginTop: 6,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.black,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    noChatsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    noChat: {
        fontSize: 18,
        color: '#555',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default styles;