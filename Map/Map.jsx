import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SearchTab from '../components/searchTab';
import mapStyle from '../styles/mapStyle';
import STYLES from '../styles/map.style';
import { direccionCoordenadas, informacionUsuario } from '../api_service/API_Map';

const Map = () => {
    const [latitud, setLatitud] = useState(41.1);
    const [longitud, setLongitud] = useState(1.89);
    const [reach, setReach] = useState(0);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function infoUsuario() {
        try {
            const data = await informacionUsuario();
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                setReach(data.data.reach);
                setAddress(data.data.address);
                console.log("ADDRESS = ", data.data.address);
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

    useEffect(() => {
        async function fetchData() {
            await infoUsuario();
            if (!error) {
                await infoCoordenadas();
            }
            setLoading(false);
        }
        fetchData();

        console.log(latitud)
        console.log(longitud)
    }, [address]);

    const items = [
        { title: 'Productors', index: 1 },
        { title: 'Mercats', index: 2 },
        { title: 'Restaurants', index: 3 },
    ];

    const handleSearch = (text) => {
        console.log(text);
    };

    if (loading) {
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
                    title="Tú"
                    pinColor="blue"
                />
            </MapView>

            <View style={STYLES.searchTab}>
                <SearchTab
                    placeholder="Search for a location"
                    style={STYLES.searchBar}
                    onChangeText={handleSearch}
                />
            </View>
            <ScrollView 
                horizontal 
                scrollEventThrottle={1} 
                height={50} 
                style={STYLES.scroll}>
                {items.map((item, index) => (
                    <TouchableOpacity key={index} style={STYLES.filtro}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Map;
