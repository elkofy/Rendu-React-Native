import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";

export default function DrinkCard({drink, openDrink}) {
    return (
        <TouchableOpacity onPress={() => {openDrink(drink.idDrink)}}>
        <View style={styles.card} >
            <Text>{drink.strDrink}</Text>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: drink.strDrinkThumb}}
            />
        </View>
        </TouchableOpacity>
    )
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