import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { getFavourites } from "../api_service/APIFavoritos";
import { COLORS } from "../constants/theme";
import { useFocusEffect } from "@react-navigation/native";

import ProductorMinoristaItem from "../components/productorMinorista";
import ProductItem from "../components/productItem";
import TypeItem from "../components/typeItem";
import { getPalabra } from "../informacion/User";

const Favoritos = ({ navigation, userId, userType }) => {
    const [searchParty, setSearchParty] = useState([]);
    const [favouriteData, setFavouriteData] = useState({
        types: [],
        minoristas: [],
        productors: [],
        products: [],
    });
    const [selectedType, setSelectedType] = useState("Products");

    useEffect(() => {
        if (userType === "Productors") {
            setSearchParty(["Types", "Minoristas", "Products"]);
        } else if (userType === "Minoristas") {
            setSearchParty(["Productors", "Products", "Types"]);
        }
        else {
            setSearchParty(["Types", "Minoristas", "Productors", "Products"]);
        }
    }, [userType]);

    const fetchData = useCallback(async () => {
        try {
            if (selectedType === "Types") {
                const data = await getFavourites(userId, "types", userType.toLowerCase());
                const result = data.data || [];
                setFavouriteData(prevState => ({ ...prevState, types: result }));
            } else if (selectedType === "Minoristas") {
                const data = await getFavourites(userId, "minoristas", userType.toLowerCase());
                const result = data.data || [];
                setFavouriteData(prevState => ({ ...prevState, minoristas: result }));
            } else if (selectedType === "Productors") {
                const data = await getFavourites(userId, "productors", userType.toLowerCase());
                const result = data.data || [];
                setFavouriteData(prevState => ({ ...prevState, productors: result }));
            } else if (selectedType === "Products") {
                const data = await getFavourites(userId, "products", userType.toLowerCase());
                const result = data.data || [];
                setFavouriteData(prevState => ({ ...prevState, products: result }));
            }
        } catch (error) {
            console.error(`Failed to fetch ${selectedType.toLowerCase()} data: `, error);
        }
    }, [selectedType, userId, userType]);

    useFocusEffect(
        useCallback(() => {
            // Reset data when screen comes into focus
            setFavouriteData({
                types: [],
                minoristas: [],
                productors: [],
                products: [],
            });
            fetchData();
        }, [fetchData])
    );

    const renderFavourites = () => {
        let favourites = favouriteData[selectedType.toLowerCase()];

        if (!Array.isArray(favourites) || favourites.length === 0) {
            const tipo = selectedType.toLowerCase().slice(0, -1);
            return <Text style={styles.noItemsText}>{getPalabra("no_selection")} {tipo} {getPalabra("yet")}.</Text>;
        }

        if (selectedType === "Productors") {
            return favourites.map((item, index) => (
                <ProductorMinoristaItem
                    key={index}
                    name={item.productor_name}
                    username={item.username}
                />
            ));
        } else if (selectedType === "Minoristas") {
            return favourites.map((item, index) => (
                <ProductorMinoristaItem
                    key={index}
                    name={item.service_name}
                    username={item.telephone}
                />
            ));
        } else if (selectedType === "Products") {
            return favourites.map((item, index) => (
                <ProductItem key={index} navigation={navigation} item={item} />
            ));
        } else if (selectedType === "Types") {
            return favourites.map((item, index) => (
                <TypeItem key={index} type={item.name} />
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
                            {getPalabra(party)}
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
