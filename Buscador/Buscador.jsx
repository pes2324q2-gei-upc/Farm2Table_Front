import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
import React,  {useState, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, URL} from '../constants/theme'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Header from '../navigation/header'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchData2 } from '../api_service/ApiBuscador'
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from '../styles/buscador.style'
import SearchTab from '../components/searchTab'
import ProductList from './ProductList'
import ProductorList from './ProductorList'
import RestaurantList from './RestaurantList'
import MercatList from './MercatList'
import { getPalabra } from '../informacion/User'
const API_ENDPOINT = "http://"+URL+"/users/productor/";
const API_PRODUCTES = "http://"+ URL +"/products/";
const API_RESTAURANTS = "http://"+ URL +"/users/restaurants/";
const API_MERCATS = "http://"+ URL +"/users/mercats/";

const TouchableElement = ({ title, isSelected, onPress, index, color,  backgroundColor, borderColor }) => {

    return (
      <TouchableOpacity
      style={[styles.boton, isSelected && {  backgroundColor }, isSelected && { borderColor }]}
        onPress={() => {
          onPress(index);
        }}
      >
        <Text style={[styles.text, isSelected && { color }]}>{title}</Text>
      </TouchableOpacity>
    );
};

const Buscador = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    var v = 1;
    useFocusEffect(
        useCallback(() => {
        fetchData2(API_RESTAURANTS,2,setData3);
        fetchData2(API_ENDPOINT, 0, setData1);
        fetchData2(API_PRODUCTES, 1,setData2);
        fetchData2(API_MERCATS, 3,setData4);
        if(v == 1) setSelectedIndex(1); v =2;
    }, [])
);

    const navigation = useNavigation();


    const handleItemPress = (index) => {
        setSelectedIndex(index);
    };

    const items = [
        { title: getPalabra("farmers"), index: 1 },
        { title: getPalabra("products"), index: 2 },
        { title: getPalabra("restaurants"), index: 3 },
        { title: getPalabra("markets"), index: 4}
    ];

    return (
        <SafeAreaView style = {styles.info}>
            <Header></Header>
            <View style={styles.bottom}>
                <SearchTab
                  placeholder={getPalabra("search_by_name")}
                  style={styles.searchBar}
                  onChangeText={setSearchQuery}
                />
                    <View style={styles.row}>
                        <ScrollView 
                            horizontal ={true}
                            showsHorizontalScrollIndicator={false}>
                        {items.map((item, index) => (
                        <TouchableElement
                            key={index}
                            title={item.title}
                            isSelected={item.index === selectedIndex}
                            onPress={() => {
                                const index = item.index;
                                handleItemPress(index);
                              }}
                            color= {item.index === selectedIndex ? 'white' : 'black'}
                            borderColor={item.index === selectedIndex ? 'white' : 'black'}
                            backgroundColor = {item.index === selectedIndex ? 'orange' : 'gray'}
                        />
                        ))}
                        </ScrollView>
                    </View>
                {selectedIndex === 1 && <ProductorList data={data1} searchQuery={searchQuery} />}
                {selectedIndex === 2 && <ProductList data={data2} searchQuery={searchQuery} />}
                {selectedIndex === 3 && <RestaurantList data={data3} searchQuery={searchQuery} />}
                {selectedIndex === 4 && <MercatList data={data4} searchQuery={searchQuery} />}
            </View>
        </SafeAreaView>
    )
}

export default Buscador