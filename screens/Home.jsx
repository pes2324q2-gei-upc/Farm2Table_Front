import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native';
import { COLORS, SIZES, URL } from '../constants/theme';
import Header from '../navigation/header';
import ShopFeed from '../Products/ShopFeed';
import AddButton from '../components/addButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import { getPalabra, userType } from '../informacion/User';

const MainFeed = () => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const tipo = userType();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://${URL}/users/productors/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setShopData(data.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useFocusEffect(
      useCallback(() => {
        fetchData();
      }, [])
  );

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

  const handleAddButtonPress = () => {
    navigation.navigate("AddProduct");
  };

  if (shopData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <SafeAreaView style={styles.containerIn}>
          <View style={styles.errorContainer}>
            <Text>{getPalabra("no_product")}</Text>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SafeAreaView style={styles.containerIn}>
        <ScrollView contentContainerStyle={styles.feedContainer}>
          {shopData.map((shop, index) => (
            shop.products_info.length > 0 && <ShopFeed key={index} navigation={navigation} data={shop} />
          ))}
        </ScrollView>
        {tipo === 'Productor' && (
          <AddButton onPress={handleAddButtonPress} />
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    
  },
  containerIn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SIZES.height * 0.1,
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
