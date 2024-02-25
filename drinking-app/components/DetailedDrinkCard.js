import {View, Image, StyleSheet, TouchableOpacity} from "react-native";
import {Button, Chip, Text} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (name) => {
    try {
        console.log(name);
        const value = await AsyncStorage.getItem('my-drinks');
        if (value !== null) {
            console.log('itExitsts', value);
            let alreadyExist = false;
            value.split(',').map((item) => {
                if (item === name) {
                    alreadyExist = true;
                }
            })
            if (alreadyExist) {
                return;
            }
            let newValue = value + ',' + name;
            await AsyncStorage.setItem('my-drinks', newValue);// value previously stored
        } else {
            console.log('doesnt Exitst', value);

            await AsyncStorage.setItem('my-drinks', name);
        }
        console.log('new value', await AsyncStorage.getItem('my-drinks'));

    } catch (e) {
        console.log(e);
    }
}
export default function DetailedDrinkCard({drink}) {
    const ingredients = []
    {
        for (let i = 1; i <= 15; i++) {
            if (drink[`strIngredient${i}`]) {
                ingredients.push(<Chip key={i} icon="plus">{drink[`strIngredient${i}`]}</Chip>)
            }
        }
    }
    return (
        <View style={styles.card}>
            <Text>{drink.strDrink}</Text>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: drink.strDrinkThumb}}
            />
            <Chip icon="liquor">{drink.strAlcoholic}</Chip>
            <Chip icon="tag">{drink.strCategory}</Chip>
            {ingredients}
            <Text>{drink.strInstructions}</Text>
            <Button onPress={async () => {
                await storeData(drink.strDrink);
            }}>Add to Favorite</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5
    }
})