import { View, Text, StyleSheet, Dimensions, ScrollView,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SearchTab from '../components/searchTab';
import styles from '../styles/ticket.styles';
import mapStyle from '../styles/mapStyle';
import STYLES from '../styles/map.style';

const Map = () => {

	const items = [
		{ title: 'Productors', index: 1 },
		{ title: 'Mercats', index: 2 },
		{ title: 'Restaurants', index: 3 },
	];

    const handleSearch = (text) => {
        console.log(text);
    };
    
    return (
    <View style={STYLES.container}>
        <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={STYLES.mapStyle}
        region={{
          latitude: 41.3995345,
          longitude: 2.1909796,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
        >
            <Marker
            coordinate={{
                latitude: 41.3995345,
                longitude: 2.1909796
            }}
            title="HOLAAAA"
            description="DESCRIPCIOOON"
            pinColor='black'
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
					style={STYLES.scroll}
				>
                    {items.map((item, index) => (
                        <TouchableOpacity key={index} style={STYLES.filtro}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
				</ScrollView>
    </View>
    
  )
}

export default Map;