import React from 'react';
import {ImageBackground, Pressable, StyleSheet, TextInput, View} from 'react-native';
import ItemList from "./components/ItemList";
import NewItemInput from "./components/NewItemInput";
import {Button, PaperProvider,Text} from "react-native-paper";

const sampleGoals = [
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon",
];


const image = { uri: "https://img.freepik.com/free-vector/line-background-wave-gradient-template-design_483537-5083.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707523200&semt=ais" };

export default function App() {

    const [newGoal, onChangeGoal] = React.useState('');
    const [goals, setGoals] = React.useState(sampleGoals);
    const onPressFunction = () => {
        if (newGoal === '') {
            return;
        }
        setGoals([...goals, newGoal]);
        onChangeGoal('');
    }
    const removeGoal = (index) => {
        let newGoals = goals.filter((goal, i) => i !== index);
        setGoals(newGoals);
    }
    const editGoalByIndex = (index, editedGoal) => {
        if (editedGoal === '') {
            return;
        }
        const editedGoals = goals.map((goal, i) => {
            if (i === index) {
                return editedGoal;
            }
            return goal;
        })
        setGoals(editedGoals);
    }

    return (
        <PaperProvider>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <Text style={styles.title} variant="displayMedium">Mes objectifs</Text>
                <NewItemInput newGoal={newGoal} onChangeGoal={onChangeGoal} onPressFunction={onPressFunction}/>
                <ItemList goals={goals} removeGoal={removeGoal} editGoal={editGoalByIndex}/>
            </View>
            </ImageBackground>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 150,
        height: '100%',
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    },
    background: {
        backgroundColor: 'cyan',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },

});


