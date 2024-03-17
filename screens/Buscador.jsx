import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React,  { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES} from '../App'
import { AntDesign } from '@expo/vector-icons'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

const API_ENDPOINT = 'https://randomuser.me/api/?results=30';


const TouchableElement = ({ title, isSelected, onPress, index, color, borderColor }) => {

    return (
      <TouchableOpacity
      style={[styles.boton, isSelected && { borderColor }]}
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
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT);
    }, []);

    const fetchData = async(url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);
            //console.log(json.results);
        }catch (error) {
            setError(error);
            console.log(error);
        }
    };

    const handleItemPress= (index) => {
        setSelectedIndex(index);
    };

    const items = [
        { title: 'Pagès', index: 0 },
        { title: 'Producte', index: 1 },
        { title: 'Restaurant', index: 2 },
    ];

    return (
        <SafeAreaView style = {styles.info}>
            <View style={styles.top}>

            </View>
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
                            onPress={() => handleItemPress(item.index)}
                            color={item.index === selectedIndex ? 'orange' : 'black'}
                            borderColor={item.index === selectedIndex ? 'orange' : 'gray'}
                        />
                        ))}
                    </View>
                </View>
                <FlatList 
                    data= {data.filter(item => 
                        item.login.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.name.last.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                    keyExtractor={(item) => item.login.username}
                    renderItem={({item}) => (
                        <View style={styles.lista}>
                            <Image source = {{uri: item.picture.thumbnail}} style={styles.image} />
                            <View>
                                <Text style={styles.textName}>
                                    {item.name.first} {item.name.last}
                                </Text>
                                <Text style={styles.textEmail}>{item.login.username}</Text>
                            </View>
                        </View>
                    )
                }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    },
    bottom: {
        width: '100%',
        backgroundColor: COLORS.primary,
        height: (SIZES.height/100)*78,
        paddingTop: 30,
        alignItems: 'center',
        //justifyContent: 'center,'
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
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    lista:{
        flexDirection:"row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10,
        width: (SIZES.width/100) *90
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
    }
})
export default Buscador