import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React,  {useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, URL} from '../constants/theme'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Header from '../navigation/header'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchData2 } from '../api_service/ApiBuscador'
const API_ENDPOINT = "http://"+URL+"/users/productor/";
const API_PRODUCTES = "http://"+ URL +"/products/";


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
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useFocusEffect(
        useCallback(() => {
        fetchData2(API_ENDPOINT, 0, setData1);
        fetchData2(API_PRODUCTES, 1,setData2);
        setSelectedIndex(1);
    }, [])
);

    const navigation = useNavigation();

    const handlePress = (item) => {
        navigation.navigate('Consultar_Usuario', { item });
      };

    const keyExtractor1 = (item) => item.username.toString();
    
    const keyExtractor2 = (item) => item.id.toString();

    const renderItem1 = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.lista}>
          <Image source={{ uri: item.avatar }} style={styles.image} />
          <View>
            <Text style={styles.textName}>{item.username}</Text>
            <Text style={styles.textEmail}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    
    const renderItem2 = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { id: item.id })}>
        <View style={styles.lista}>
            <Image source = {{uri: item.image}} style={styles.image} />
            <View>
                <Text style={styles.textName}>
                {item.name}
                </Text>
                <Text style={styles.textEmail}>{item.username}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );

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
                <TextInput
                    placeholder= 'Search by username' 
                    clearButtonMode='always' 
                    style={styles.searchBar} 
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={searchQuery}
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
                
                <FlatList   
                    data={selectedIndex === 1 ? data1.filter(item => item.username.toLowerCase().includes(searchQuery.toLowerCase())) : data2.filter(item => 
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                    keyExtractor={selectedIndex === 1  ? keyExtractor1 : keyExtractor2}
                    renderItem={selectedIndex === 1 ? renderItem1 : renderItem2}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    lista:{
        flexDirection:"row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10,
        width: (SIZES.width/100) *90,
        height: 100,
        backgroundColor: 'transparent',
    },
    info: {
        width: '100%',
        backgroundColor: COLORS.secondary,
        height: SIZES.height/100,
        flex:1,
    }, 
    top: {
        width: '100%',
        backgroundColor: COLORS.secondary,
        height: (SIZES.height/100)*10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        width: '100%',
        backgroundColor: COLORS.primary,
        height: (SIZES.height)/100*80,
        paddingTop: 30,
        alignItems: 'center',
    },
    searchBar:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 15,
        width: (SIZES.width)/100 *90,
    },
    boton: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    filtros: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingBottom: 20,
    },
    text: {
        fontSize: SIZES.xsmall,
        fontWeight: 'bold'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 25,
    },
    textName: {
        fontSize: SIZES.xlarge,
        marginLeft: 10,
        fontWeight: '600'
    },
    textEmail: {
        fontSize: SIZES.large,
        marginLeft: 10,
        color: "grey"
    },
})
export default Buscador