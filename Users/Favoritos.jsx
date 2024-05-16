import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { getFavourites } from "../api_service/APIFavoritos";
import { COLORS } from "../constants/theme";

import ProductorMinoristaItem from "../components/productorMinorista";
import ProductItem from "../components/productItem";
import TypeItem from "../components/typeItem";

const Favoritos = ({ navigation, userId, userType }) => {
    const [searchParty, setSearchParty] = useState([]);
    const [dataFetched, setDataFetched] = useState({
        types: false,
        minoristas: false,
        productors: false,
        products: false,
    });
    const [favouriteData, setFavouriteData] = useState({
        types: [],
        minoristas: [],
        productors: [],
        products: [],
    });
    const [selectedType, setSelectedType] = useState("Products");

    useEffect(() => {
        setSearchParty(["Types", "Minoristas", "Productors", "Products"]);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedType === "Types" && !dataFetched.types) {
                try {
                    const data = await getFavourites(userId, "types", userType.toLowerCase());
                    setFavouriteData(prevState => ({ ...prevState, types: data || [] }));
                    setDataFetched(prevState => ({ ...prevState, types: true }));
                } catch (error) {
                    console.error("Failed to fetch types data: ", error);
                }
            } else if (selectedType === "Minoristas" && !dataFetched.minoristas) {
                try {
                    const data = await getFavourites(userId, "minoristas", userType.toLowerCase());
                    const result = data.data || [];
                    setFavouriteData(prevState => ({ ...prevState, minoristas: result }));
                    setDataFetched(prevState => ({ ...prevState, minoristas: true }));
                } catch (error) {
                    console.error("Failed to fetch minoristas data: ", error);
                }
            } else if (selectedType === "Productors" && !dataFetched.productors) {
                try {
                    const data = await getFavourites(userId, "productors", userType.toLowerCase());
                    const result = data.data || [];
                    console.log(result);
                    setFavouriteData(prevState => ({ ...prevState, productors: result }));
                    setDataFetched(prevState => ({ ...prevState, productors: true }));
                    console.log(favouriteData.productors);
                } catch (error) {
                    console.error("Failed to fetch productors data: ", error);
                }
            } else if (selectedType === "Products" && !dataFetched.products) {
                try {
                    const data = await getFavourites(userId, "products", userType.toLowerCase());
                    setFavouriteData(prevState => ({ ...prevState, products: data || [] }));
                    setDataFetched(prevState => ({ ...prevState, products: true }));
                } catch (error) {
                    console.error("Failed to fetch products data: ", error);
                }
            }
        };

        fetchData();
    }, [selectedType, userId, userType, dataFetched]);

    const renderFavourites = () => {
        let favourites = favouriteData[selectedType.toLowerCase()];

        if (!Array.isArray(favourites) || favourites.length === 0) {
            return <Text style={styles.noItemsText}>You haven't selected any {selectedType.toLowerCase()} yet.</Text>;
        }

        if (selectedType === "Productors" || selectedType === "Minoristas") {
            return favourites.map((item, index) => (
                <ProductorMinoristaItem
                    key={index}
                    name={item.productor_name}
                    username={item.username}
                />
            ));
        } else if (selectedType === "Products") {
            return favourites.map((item, index) => (
                <ProductItem key={index} item={item} />
            ));
        } else if (selectedType === "Types") {
            return favourites.map((item, index) => (
                <TypeItem key={index} type={item} />
            ));
        }

        return null;
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.selectionRow}>
                {searchParty.map((party, index) => (
                    <TouchableOpacity 
                        key={index} 
                        onPress={() => setSelectedType(party)}
                        style={[
                            styles.selectionButton, 
                            selectedType === party && styles.selectedButton
                        ]}
                    >
                        <Text style={styles.white}>
                            {party}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView style={styles.scrollView}>
                {renderFavourites()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    selectionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        alignItems: "center",
        marginTop: 10,
    },
    selectionButton: {
        padding: 10,
        borderRadius: 10,
        height: 40,
        backgroundColor: COLORS.secondary,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: COLORS.tertiary,
    },
    selectionButtonText: {
        color: COLORS.text,
        textAlign: 'center',
        width: '100%',
    },
    selectedButtonText: {
        color: 'white',
        textAlign: 'center',
        width: '100%',
    },
    scrollView: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: 20,
    },
    noItemsText: {
        fontSize: 18,
        color: COLORS.text,
        textAlign: 'center',
        marginTop: 20,
    },
    text: {
        alignContent: "center",
        fontSize: 20,
        color: COLORS.secondary,
    },
    white: {
        color: "white",
        fontWeight: "bold",
    },
});

export default Favoritos;
