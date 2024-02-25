import {FlatList, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import DrinkCard from "../components/DrinkCard";
import DetailedDrinkCard from "../components/DetailedDrinkCard";
import {Button} from "react-native-paper";

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function HomeScreen({navigation: {navigate}}) {
    const [drinks, setDrinks] = useState([]);
    const [letterIndex, setLetterIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const fetchDrinksByLetter = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letters[letterIndex]}`);
        const data = await response.json();
        setDrinks([...drinks, ...data.drinks]);
    }

    useEffect(() => {
        fetchDrinksByLetter()
            .then(r => console.log('done'))
            .catch(e => console.log(e));
    }, []);

    const fetchMoreDrinks = async () => {
        if (letterIndex >= letters.length) {
            return;
        }
        setLetterIndex(letterIndex + 1);
        await fetchDrinksByLetter();
    }
    const openDrink = async (id) => {
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then(r => r.json()).then(data => {
            setSelectedDrink(data.drinks[0]);
        });
        setModalVisible(true);


    }

    return (
        <View style={{flex: 1}}>
            <Modal animationType="slide"
                   visible={modalVisible}>
                <DetailedDrinkCard drink={selectedDrink}></DetailedDrinkCard>
                <Button onPress={() => setModalVisible(false)}>Close</Button>
            </Modal>
            <FlatList data={drinks} renderItem={({item}) => <DrinkCard drink={item} openDrink={openDrink}/>}
                      onEndReachedThreshold={0.8}
                      numColumns="2"
                      onEndReached={fetchMoreDrinks}/>
        </View>
    );
}
