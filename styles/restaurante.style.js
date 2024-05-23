import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../constants/theme';

const styles = StyleSheet.create({
  safe: {
      width: '100%',
      backgroundColor: COLORS.secondary,
      //paddingTop: SIZES.height/1,
    
  },
  vista: {
      backgroundColor: COLORS.primary,
      height: '100%',
      //backgroundColor: 'red'
  },
  cabecera: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: SIZES.height/7
  },
  restaurantName: {
      fontSize: 30, // Adjust the font size as needed
      //fontWeight: 'bold', // Add additional text styles as needed
      marginLeft: 20,
      color: COLORS.primary,
      //backgroundColor: 'red',
      width: SIZES.width/100*50
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      paddingHorizontal: SIZES.padding,
  },
  button: {
      alignItems: "center",
      height: 40,
      borderBottomWidth: 2,
  },
  buttonText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      fontSize: SIZES.xlarge
  },
  avatar: {
    width:'77%',
    height: '80%',
    borderRadius: 0,
    resizeMode: 'contain'

  },
  cuadro: {
    flexDirection: 'row',
    borderWidth: 5,
    borderColor: COLORS.secondary,
    marginTop: 15,
    height: SIZES.height/100*15,
    backgroundColor:'white',
    borderRadius: 25,
    width: '100%',
    paddingVertical: 0
  },
	lista: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
		//backgroundColor: 'blue',
		maxHeight: '61%'
  },
  imagen:{
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  info:{
    flexDirection: 'column',
    width: '60%',
    marginLeft: 10
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0,
  },
  comment: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  container: {
    height: '100%',
		backgroundColor: COLORS.primary
	},
	title: {
			fontSize: 20,
			marginBottom: 20,
			alignSelf: 'center',
			marginTop: 40,
			fontWeight: '600',
			borderBottomColor: 'black',
			//borderWidth: 2
	},
	input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10, // Ensure this is appropriate for your design
    width: '80%',
    alignSelf: 'center',
    color: 'black',
    textAlign: 'left',
		paddingTop: 0,
		paddingBottom: 0,
		fontSize: 16
},
	container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    //paddingHorizontal: 20,
  },
  containerIn: {
    backgroundColor: COLORS.primary,
		width: '100%',
		height: '100%'
  },
	nameRest: {
			fontSize: 30,
			marginBottom: 10,
			alignSelf: 'center',
			fontWeight: 'bold',
			//backgroundColor: 'red'
	},
	v1:{
    width: '90%',
    alignSelf: 'center',
    height: '11.6%',
    borderTopColor: COLORS.secondary,
    //borderTopWidth: '0.5',
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: '0.5',
    flexDirection: 'row',
    alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		marginTop: 10
	},
	button2: {
    backgroundColor: 'transparent',
    borderColor: COLORS.secondary,
    borderWidth: 2.5,
    width:'30%',
    height: '8%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 100
  },
	buttontext2:{
    width: 100,
    textAlign: 'center',
    color: COLORS.secondary,
    fontSize: 20,
    fontWeight: '700',
  },
});
export default styles