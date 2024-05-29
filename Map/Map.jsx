import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SearchTab from '../components/searchTab';
import mapStyle from '../styles/mapStyle';
import STYLES from '../styles/map.style';
import { calculoDistancias, direccionCoordenadas, infoVendedor, informacionMinorista, informacionUsuario, vendedoresEnRango } from '../api_service/API_Map';
import { getPalabra, userId, userType } from '../informacion/User';

const Map = () => {
    const [latitud, setLatitud] = useState(41.1);
    const [longitud, setLongitud] = useState(1.89);
    const [reach, setReach] = useState(40);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [marcadores, setMarcadores] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [distancia, setDistancia] = useState("");
    const [titulo, setTitulo] = useState("");
    const [type, setType] = useState("");

    const items = [
        { title: 'Productors', index: 1 },
        { title: 'Mercats', index: 2 },
        { title: 'Restaurants', index: 3 },
    ];

    async function infoUsuario() {
        try {
            const data = await informacionUsuario(userId());
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                setReach(data.data.reach);
                setAddress(data.data.address);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    async function infoCoordenadas() {
        try {
            const data = await direccionCoordenadas(address);
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                setLatitud(data[0]);
                setLongitud(data[1]);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    async function infoMinorista() {
        try {
            const data = await informacionMinorista(userId());
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                setAddress(data.address)
                setReach(data.user.reach)
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    async function vendedoresRango(type) {
        try {
            const data = await vendedoresEnRango(type, reach, latitud, longitud);
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                const marcadoresNuevos = data.map((item) => ({
                    latitude: item[0][0],
                    longitude: item[0][1],
                    title: item[1].username,
                    id: item[1].id
                }));
                setMarcadores(marcadoresNuevos);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    async function calculaDistancia(latitudMarcador, longitudMarcador) {
        try {
            const data = await calculoDistancias(latitudMarcador, longitudMarcador, latitud, longitud);
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                setDistancia(data)
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    async function nombreVendedor(id) {
        try {
            const data = await infoVendedor(id);
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                if (type === "Productors") setTitulo(data.data.productor_name);
                else setTitulo(data.data.service_name);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    async function getInfoVendedor(latitudMarcador, longitudMarcador, id) {
        calculaDistancia(latitudMarcador, longitudMarcador);
        nombreVendedor(id);
    }

    useEffect(() => {
        async function fetchData() {
            if (address === '') {
                if (userType() === "Consumer") await infoUsuario();
                else await infoMinorista();
            }
            if (!error && address != '') {
                await infoCoordenadas();
            }
            setLoading(false);
        }
        fetchData();
    }, [address]);

    useEffect(() => {
        
    }, [distancia]);

    const handleSearch = (text) => {
        
    };

    const handleFilter = (item) => {
        if (item.index != selectedIndex) {
            setSelectedIndex(item.index)
            setType(item.title)
            if (item.title === "Restaurants") vendedoresRango("restaurant");
            else if (item.title === "Productors") vendedoresRango("productor");
            else vendedoresRango("mercat");
        }
    };

    if (loading || address === '') {
        return (
            <View style={STYLES.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={STYLES.container}>
            <MapView
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                style={STYLES.mapStyle}
                region={{
                    latitude: latitud,
                    longitude: longitud,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                }}
                mapType="standard"
            >
                <Marker
                    coordinate={{
                        latitude: latitud,
                        longitude: longitud,
                    }}
                    title={getPalabra("you")}
                    pinColor="blue"
                />
                {marcadores.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={userId() === marker.id ? getPalabra("you"): titulo}
                        description={((distancia === "" || userId() === marker.id)? "": distancia+' '+getPalabra("from_you"))}
                        onPress={() => getInfoVendedor(marker.latitude, marker.longitude, marker.id)}
                        pinColor={(marker.id === userId() ? 'blue': 'red')}
                    />
                ))}
            </MapView>

            <ScrollView 
                horizontal 
                scrollEventThrottle={1} 
                height={50} 
                style={STYLES.scroll}>
                {items.map((item, index) => (
                    <TouchableOpacity key={index} 
                    style={[STYLES.filtro, {backgroundColor: (item.index === selectedIndex ? 'orange': 'white')}]} o
                    onPress={() => handleFilter(item)}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Map;
