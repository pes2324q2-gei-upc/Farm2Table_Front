import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../navigation/header';
import ShopFeed from '../products/ShopProducts';

const MainFeed = () => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.39.109.155/users/productors/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setShopData(data.data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SafeAreaView style={styles.containerIn}>
        <ScrollView contentContainerStyle={styles.feedContainer}>
          {shopData.map((shop, index) => (
            <ShopFeed key={index} shopName={shop.username} products={shop.products_info} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    paddingHorizontal: 20,
  },
  containerIn: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  feedContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 29,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainFeed;
