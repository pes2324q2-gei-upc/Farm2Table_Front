import { StyleSheet } from 'react-native';
import {COLORS} from "../constants/theme";

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fefae0',
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    scrollView: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#315220',
        marginVertical: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        color: '#315220',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#bc6c25',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        height: 40,
        textAlignVertical: 'top',
    },
    multilineInput: {
        height: 120,
        paddingTop: 10,
        paddingBottom: 10,
    },
    multilineInputScroll: {
        maxHeight: 150,
    },
    dropdown: {
        borderColor: '#bc6c25',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        maxHeight: 140,
    },
    imagePickerContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    imageButton: {
        backgroundColor: '#315220',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        marginVertical: 20,
    },
    submitButton: {
        backgroundColor: '#bc6c25',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 70,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    removeButton: {
        marginLeft: 10,
        backgroundColor: '#E53935',
        padding: 10,
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginTop: 5,
    },
    quantityUnitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        width: '90%',
    },
    quantityContainer: {
        flex: 1,
        marginRight: 10,
        width: '70%',
    },
    unitPickerContainer: {
        width: '30%',
        height: '300%',
    },
    picker: {
        width: 100,
        height: 40,
    },
});
export default styles;