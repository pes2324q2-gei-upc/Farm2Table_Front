import { StyleSheet, Dimensions } from 'react-native';

const STYLES = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      ...StyleSheet.absoluteFillObject,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default STYLES;