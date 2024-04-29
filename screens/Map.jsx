import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../styles/mapStyle';
import STYLES from '../styles/map.style';

const Map = () => {

  return (
    <SafeAreaView style={STYLES.container}>
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
    </SafeAreaView>
    
  )
}

export default Map;