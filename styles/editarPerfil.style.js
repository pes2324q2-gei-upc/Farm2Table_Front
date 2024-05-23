import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../constants/theme';
const styles = StyleSheet.create({
  buttontext:{
    width: 100,
    textAlign: 'center',
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '700',
  },
  bottom: {
    //backgroundColor: 'red',
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: '12%'
  }, 
  button: {
    backgroundColor: 'transparent',
    borderColor: COLORS.secondary,
    borderWidth: 2.5,
    width:'25%',
    height: '20%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top:{
    width: '100%',
    backgroundColor: COLORS.primary,
    height: SIZES.height,
  },
  vista:{
    width: '100%',
    height: (SIZES.height/100)*60,
  },
  v1:{
    width: '90%',
    alignSelf: 'center',
    height: '11.6%',
    borderTopColor: COLORS.secondary,
    borderTopWidth: '0.5',
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: '0.5',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%'
  },
  titulo1:{
    width: 100,
    textAlign: 'center',
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  input:{
    flex: 1,
    height: '100%',
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  profileImage: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 20,
    marginLeft: 10,
    alignSelf: 'center'
  },
});

export default styles;

