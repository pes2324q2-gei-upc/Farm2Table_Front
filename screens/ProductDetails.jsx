import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React from 'react'
import styles from '../Products/productDetails.style'
import { Ionicons } from '@expo/vector-icons'

const ProductDetails = ({navigation}) => {

  const [count, setCount] = React.useState(1)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 1) setCount(count - 1)
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={33} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart" size={33} color="black" />
          </TouchableOpacity>
        </View>

        <Image source={require('../assets/images/madu.jpg')} style={styles.image} />

        <View style={styles.card}>
          <View style={styles.name_price}>
            <Text style={styles.name}>Maduixes del Maresme</Text>
            <View style={styles.priceStyle}><Text style={styles.price}>4,99 €/kg</Text></View>
          </View>

          <View style={styles.description_row}>
            <Text style={styles.description}>Descobreix les maduixes del Maresme: vermelles, sucoses i irresistibles. Cultivades amb cura per garantir la millor qualitat. Amb una explosió de sabor en cada mossegada, aquestes maduixes captivaran els teus sentits. Embolcallades amb cura i enviades fresques a la teva porta, una experiència gastronòmica inoblidable.</Text>              
          </View>

          <View style={styles.quanity_row}>
            <View style={styles.user_info_container}>
              <View style={styles.userrow}>
                <Image source={require('../assets/images/user.png')} style={styles.user_image} />
                <Text style={styles.user_name}>Joan</Text>
              </View>

              <View style={styles.rating_row}>
              <TouchableOpacity style={styles.quantity_button} onPress={() => decrement()}>
                  <Ionicons name="remove" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{count}</Text>
                <TouchableOpacity style={styles.quantity_button} onPress={() => increment()}>
                  <Ionicons name="add" size={20} color="black" />
                </TouchableOpacity>              
              </View>
            </View>
          </View>

          <View style={styles.button_row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.button_text}>Afegir a la cistella</Text>
            </TouchableOpacity>
          </View>
          </View>
    </SafeAreaView>
  )
}

export default ProductDetails