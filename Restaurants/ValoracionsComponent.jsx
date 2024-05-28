import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import defaultAvatar from '../assets/images/149071.png'
import styles from '../styles/restaurante.style'
const ValoracionsComponent = ({ comments }) => {
    if (comments.length === 0) {
        return (
            <View style={styles.empty}>
                <Text>No hay valoraciones todavía</Text>
            </View>
        );
    }
    return (
            <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                    flexGrow: 1,
                    }}
                renderItem={({ item }) => (
                    <View style={styles.cuadro}>
                        <View style={styles.imagen}>
                            <Image
                            source={item.avatar ? { uri: item.avatar } : defaultAvatar}
                            style={styles.avatar}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.username}>{item.commentor.username}</Text>
                            <Text style={styles.comment}>{item.comment}</Text>
                        </View>
                    </View>
                )}
            />
    );
};

export default ValoracionsComponent;
