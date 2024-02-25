import {View, StyleSheet} from "react-native";
import {IconButton, Text} from "react-native-paper";
import * as React from 'react';


export default function Item({goal, index, removeGoal, showModal, hideModal}) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{goal}</Text>
            <View style={styles.action}>
                <IconButton icon="close" mode="contained" onPress={() => {
                    removeGoal(index)
                }}/>
                <IconButton icon="pencil" mode="contained" onPress={() => {
                    showModal(index, goal)
                }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        gap: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
    },
    text: {
        fontSize: 16,
        width: '50%',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20
    }
});
