import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const SliderProducts = ({ productData }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            const index = Math.round(value / (SIZES.width * 0.9)); // Ensure the index calculation matches the actual item width
            setActiveIndex(index);
        });
        return () => {
            scrollX.removeListener(listener);
        };
    }, [scrollX]);

    const scrollToIndex = (index) => {
        flatListRef.current.scrollToIndex({ animated: true, index });
        setActiveIndex(index);
    };

    const navigation = useNavigation();

    const handlePress = (id) => {
        navigation.navigate('ProductDetails', { id });
    };

    return (
        <View>
            <Animated.FlatList
                data={productData}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.lista}>
                        <TouchableOpacity onPress={() => handlePress(item.id)}>
                            <View style={styles.capsule}>
                                <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.image} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productPrice}>{item.price} €/kg</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                ref={flatListRef}
            />
            <View style={styles.pagination}>
                {productData.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeIndex && styles.activeDot,
                        ]}
                        onPress={() => scrollToIndex(index)}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    lista: {
        marginVertical: 10,
        alignItems: 'center',
    },
    capsule: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        alignItems: 'center',
        width: SIZES.width * 0.9,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
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
    }
});

export default SliderProducts;
