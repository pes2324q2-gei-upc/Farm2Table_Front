import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
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
const API_ENDPOINT = "http://"+URL+"/users/productor/";
const API_PRODUCTES = "http://"+ URL +"/products/";
const API_RESTAURANTS = "https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?resource_id=bce0486e-370e-4a72-903f-024ba8902ae1&limit=2626"

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
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    var v = 1;
    useFocusEffect(
        useCallback(() => {
        fetchData2(API_RESTAURANTS,2,setData3);
        fetchData2(API_ENDPOINT, 0, setData1);
        fetchData2(API_PRODUCTES, 1,setData2);
        console.log(v);
        if(v == 1) setSelectedIndex(1); v =2;
        console.log(v);
    }, [])
);

    const navigation = useNavigation();


    const handleItemPress = (index) => {
        setSelectedIndex(index);
    };

    const items = [
        { title: 'Pagès', index: 1 },
        { title: 'Productes', index: 2 },
        { title: 'Restaurants', index: 3 },
    ];

    return (
        <SafeAreaView style = {styles.info}>
            <Header></Header>
            <View style={styles.bottom}>
                <SearchTab
                  placeholder="Search by name"
                  style={styles.searchBar}
                  onChangeText={setSearchQuery}
                />
                <View styles = {styles.filtros}>
                    <View style={styles.row}>
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
                    </View>
                </View>
                
                {selectedIndex === 1 && <ProductorList data={data1} searchQuery={searchQuery} />}
                {selectedIndex === 2 && <ProductList data={data2} searchQuery={searchQuery} />}
                {selectedIndex === 3 && <RestaurantList data={data3} searchQuery={searchQuery} />}
            </View>
        </SafeAreaView>
    )
}

export default Buscador