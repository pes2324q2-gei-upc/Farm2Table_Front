import { View, Text, StyleSheet, Dimensions, ScrollView,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SearchTab from '../components/searchTab';
import styles from '../styles/ticket.styles';
const Map = () => {

	const items = [
		{ title: 'Productors', index: 1 },
		{ title: 'Mercats', index: 2 },
		{ title: 'Restaurants', index: 3 },
	];
  const mapStyle = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "32"
            },
            {
                "lightness": "-3"
            },
            {
                "visibility": "on"
            },
            {
                "weight": "1.18"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-70"
            },
            {
                "lightness": "14"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "100"
            },
            {
                "lightness": "-14"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": "12"
            }
        ]
    }
]
  
  return (
    <View style={STYLES.container}>
        <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={STYLES.mapStyle}
        initialRegion={{
          latitude: 41.3995345,
          longitude: 2.1909796,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
        ></MapView>
        <View style={STYLES.searchTab}>
            <SearchTab/>
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

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width:"100%",
    height: "100%",
  },
  searchTab:{
    position: 'absolute', 
    top: '10%',
    width: '100%',
  },
	filtros: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scroll: {
		position: 'absolute',
		//backgroundColor: 'blue',
		top: '18%',
		paddingHorizontal: 20
	},
	filtro: {
		flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
	}
});

export default Map;