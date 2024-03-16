import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {COLORS, SIZES} from "../constants/theme";

const Productos = () => {
    return (
        <View>
            <Text style={styles.container}>
                Va mal
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary, // or whatever background color you have
        width: 50,
        height: 1,
    },

});
export default Productos