import {View, StyleSheet, FlatList} from "react-native";
import {Modal, Portal, TextInput, Button} from "react-native-paper";
import * as React from 'react';
import Item from "./Item";


export default function ItemList({goals, removeGoal, editGoal}) {
    const [visible, setVisible] = React.useState(false);
    const [editingGoal, setEditingGoal] = React.useState('');
    const [index, setIndex] = React.useState(0);
    const showModal = (index, goal) => {
        setIndex(index);
        setEditingGoal(goal);
        setVisible(true)
    };
    const hideModal = () => setVisible(false);
    return (
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <TextInput label="Mon Objectif"
                               value={editingGoal}
                               onChangeText={text => setEditingGoal(text)}
                    />
                    <Button icon="plus" mode="contained" onPress={() => {
                        editGoal(index, editingGoal)
                        hideModal()
                    }}>
                        Modifier
                    </Button>
                </Modal>
            </Portal>
            <FlatList
                data={goals}
                renderItem={({item, index}) =>
                    <Item goal={item} index={index} removeGoal={removeGoal} showModal={showModal}/>}
            />
        </View>
    );

}
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 20
    }
});