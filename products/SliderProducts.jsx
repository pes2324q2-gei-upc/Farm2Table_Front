import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Product from './Product2';

const SliderProducts = ({ productData }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / SIZES.width);
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={productData}
                style= {styles.flatlist}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.page}>
                        <View style={styles.capsule}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.price}>{item.price} €/kg</Text>
                            </View>
                        </View>
                    </View>
                )}
                onScroll={handleScroll}
                scrollEventThrottle={16} // Adjust scroll event frequency
            />
            <View style={styles.pagination}>
                {productData.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeIndex && styles.activeDot,
                        ]}
                        onPress={() => console.log('Navigate to page:', index)}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: SIZES.width - 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    page: {
        width: SIZES.width - 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.tertiary,
        marginHorizontal: 6,
    },
    activeDot: {
        backgroundColor: COLORS.secondary,
    },

    image: {
        width: 100,
        height: 100,
    },
    
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
      },
      price: {
        fontSize: 14,
      },
    
      imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
      },
    
      textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    
      capsule: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 5,
        //flexGrow: 1,
        minWidth: SIZES.width - 75,
        maxHeight: 175,
        borderColor: COLORS.secondary,
        borderRadius: 20,
        borderWidth: 2,
      },

      flatlist: {
        flex: 1,
        width: SIZES.width - 60,
    },


});

export default SliderProducts;
