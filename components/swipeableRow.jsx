import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/theme';
import styles from "../styles/chat.style";
import {userId} from "../informacion/User";

const SwipeableRow = ({ item, onPress, onDelete }) => {

    const user = userId;

    const renderRightActions = (progress, dragX) => (
        <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Icon name="delete" size={30} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <RectButton style={styles.chatItem} onPress={onPress}>
                <Image source={{ uri: item.product.image }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>
                        {user !== item.user1.id ? item.user1.username : item.user2.username}, {item.product.name}
                    </Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {item.last_message ? item.last_message.text : ""}
                    </Text>
                </View>
            </RectButton>
            <View style={styles.separator} />
        </Swipeable>
    );
};

export default SwipeableRow;
