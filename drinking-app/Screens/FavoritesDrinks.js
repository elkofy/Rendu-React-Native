import {Text, View, Image, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";

export default function FavoritesDrinks({navigation: {navigate}}) {
    const [drinks, setDrinks] = useState([]);
    function getDrinks() {
        AsyncStorage.getItem('my-drinks').then((value) => {
                if (value !== null) {
                    let drinks = value.split(',');
                    setDrinks(drinks);
                }
            }
        );
    }

    getDrinks();


    return (
        <View style={{flex: 1}}>
            <Text>Favorites Drinks</Text>
            <FlatList data={drinks} renderItem={({item}) => <Text>{item}</Text>}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5
    }
})