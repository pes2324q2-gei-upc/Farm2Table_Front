import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import ShopFeed from '../products/ShopProducts'; // Import the ShopFeed component
import { COLORS } from '../constants/theme';
import Header from '../navigation/header';

const shopData = [
  {
    shopName: 'Fruit Haven',
    products: [
      {
        name: 'Apple',
        price: 1.99,
        image: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w='
      },
      {
        name: 'Banana',
        price: 0.99,
        image: 'https://www.bama.no/siteassets/fotoware/2023/9/bendit_bananklase-2_bama.jpg?height=620&mode=pad'
      },
      {
        name: 'Apple',
        price: 1.99,
        image: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w='
      },
      {
        name: 'Banana',
        price: 0.99,
        image: 'https://www.bama.no/siteassets/fotoware/2023/9/bendit_bananklase-2_bama.jpg?height=620&mode=pad'
      },
      {
        name: 'Apple',
        price: 1.99,
        image: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w='
      },
      {
        name: 'Banana',
        price: 0.99,
        image: 'https://www.bama.no/siteassets/fotoware/2023/9/bendit_bananklase-2_bama.jpg?height=620&mode=pad'
      },
      {
        name: 'Apple',
        price: 1.99,
        image: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w='
      },
      {
        name: 'Banana',
        price: 0.99,
        image: 'https://www.bama.no/siteassets/fotoware/2023/9/bendit_bananklase-2_bama.jpg?height=620&mode=pad'
      },
      {
        name: 'Apple',
        price: 1.99,
        image: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w='
      },
      {
        name: 'Banana',
        price: 0.99,
        image: 'https://www.bama.no/siteassets/fotoware/2023/9/bendit_bananklase-2_bama.jpg?height=620&mode=pad'
      },
      {
        name: 'Apple',
        price: 1.99,
        image: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w='
      },
      {
        name: 'Banana',
        price: 0.99,
        image: 'https://www.bama.no/siteassets/fotoware/2023/9/bendit_bananklase-2_bama.jpg?height=620&mode=pad'
      },
      {
        name: 'Apple',
        price: 1.99,
        image: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w='
      },

      // Add more products as needed
    ]
  },
  {
    shopName: 'Veggie Mart',
    products: [
      {
        name: 'Carrot',
        price: 0.79,
        image: 'https://static.vecteezy.com/system/resources/previews/027/216/290/original/red-carrot-red-carrot-transparent-background-ai-generated-free-png.png'
      },
      {
        name: 'Broccoli',
        price: 1.49,
        image: 'https://www.simplyrecipes.com/thmb/JE0zLzqyJ_z1HbJ0ayAonYp1NAw=/1800x1012/smart/filters:no_upscale()/Broccoli-6-e825c2143fd5413fbbc2dbaf2984a122.jpg'
      },
      // Add more products as needed
    ]
  },
  {
    shopName: 'Veggie Mart',
    products: [
      {
        name: 'Carrot',
        price: 0.79,
        image: 'https://static.vecteezy.com/system/resources/previews/027/216/290/original/red-carrot-red-carrot-transparent-background-ai-generated-free-png.png'
      },
      {
        name: 'Broccoli',
        price: 1.49,
        image: 'https://www.simplyrecipes.com/thmb/JE0zLzqyJ_z1HbJ0ayAonYp1NAw=/1800x1012/smart/filters:no_upscale()/Broccoli-6-e825c2143fd5413fbbc2dbaf2984a122.jpg'
      },
      // Add more products as needed
    ]
  },
  {
    shopName: 'Veggie Mart',
    products: [
      {
        name: 'Carrot',
        price: 0.79,
        image: 'https://static.vecteezy.com/system/resources/previews/027/216/290/original/red-carrot-red-carrot-transparent-background-ai-generated-free-png.png'
      },
      {
        name: 'Broccoli',
        price: 1.49,
        image: 'https://www.simplyrecipes.com/thmb/JE0zLzqyJ_z1HbJ0ayAonYp1NAw=/1800x1012/smart/filters:no_upscale()/Broccoli-6-e825c2143fd5413fbbc2dbaf2984a122.jpg'
      },
      // Add more products as needed
    ]
  },
  // Add more shops as needed
];


const MainFeed = () => {
  return (
    
    <SafeAreaView style={styles.container}>  
    <Header/ >
    <SafeAreaView style={styles.containerIn}>
      <ScrollView contentContainerStyle={styles.feedContainer}>
      {shopData.map((shop, index) => (
        <ShopFeed key={index} shopName={shop.shopName} products={shop.products} />
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
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 29,
    marginTop: 15,
    justifyContent: 'space-between',
  },
});

export default MainFeed;