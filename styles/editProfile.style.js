import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";


const styles = StyleSheet.create({
    outercontainer: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: 10,
    },
    profileContainer: {
        alignItems: 'center',
    },
    avatar: {
        width: 125,
        height: 125,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: COLORS.tertiary,
    },
    avatarPlaceholder: {
        width: 125,
        height: 124,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tertiary,
    },
    avatarPlaceholderText: {
        color: COLORS.primary,
        fontSize: 16,
    },
    editButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
    },
    editButtonText: {
        color: COLORS.primary,
        fontSize: 14,
    },
    fieldContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    label: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.tertiary,
        color: COLORS.secondary,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    button: {
        backgroundColor: COLORS.tertiary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.tertiary,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default styles;