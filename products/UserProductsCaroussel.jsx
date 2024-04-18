import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Product from './Product2';

const UserProductsCarousel = ({ user }) => {
  // Assuming you have a function to fetch the user's products from an API
  
  const fetchUserProducts = async () => {
    const response = await fetch(`https://your-api-url.com/users/${user.id}/products`);
    const data = await response.json();
    return data;
  };
  
  // Fetch the user's products when the component mounts
  React.useEffect(() => {
    fetchUserProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const [products, setProducts] = React.useState([]);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={products}
        renderItem={({ item }) => (
          <Product
            imageUrl={item.imageUrl}
            title={item.title}
            pricePerKilo={item.pricePerKilo}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default UserProductsCarousel;