// ValorarScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import styles from '../styles/restaurante.style'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { SIZES, COLORS } from '../constants/theme'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../navigation/header_back';
import { submitRating, submitComment } from '../api_service/APIValorar';

const Valorar = ({ route, navigation }) => {
    const { restaurantId, nomRestaurant} = route.params;
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1); // Default rating is 2
    const handleCommentSubmit = () => {
        console.log(rating)
        submitComment(restaurantId, comment);
        submitRating(restaurantId, rating);
    };
    const handleRatingCompleted = (rating) => {
      setRating(rating);
      console.log('Rating is: ' + rating);
    };
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <SafeAreaView style={styles.containerIn}>
            <Text style={styles.nameRest}>{nomRestaurant}</Text>
            <View style={styles.v1}>
            <Text style={styles.title}>Rating</Text>
            </View>
            <Rating
              type='custom'
              startingValue={2}
              count={5}
              showRating={false}
              defaultRating={rating}
              size={20}
              ratingColor={COLORS.secondary}
              onFinishRating={handleRatingCompleted}
              jumpValue={1}
              minValue={1}
              tintColor ={COLORS.primary}
            />
            <View style={styles.v1}>
            <Text style={styles.title}>Comentari</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Write your comment"
                placeholderTextColor={'black'}
                value={comment}
                onChangeText={setComment}
            />
            <TouchableOpacity onPress={handleCommentSubmit} style={styles.button2}>
              <Text style={styles.buttontext2}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </SafeAreaView>
    );
};

export default Valorar;
