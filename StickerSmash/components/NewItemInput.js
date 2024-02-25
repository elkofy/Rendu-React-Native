import {View, StyleSheet} from "react-native";
import {Button, TextInput} from "react-native-paper";


export default function NewItemInput({newGoal, onChangeGoal, onPressFunction}) {
    return (
        <View style={styles.wrapperCustom}
        >
            <TextInput
                label="Objectif"
                style={styles.input}
                onChangeText={(e) => onChangeGoal(e)}
                value={newGoal}
            />
            <Button icon="plus" mode="contained" onPress={onPressFunction}>
                Ajouter
            </Button>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        margin: 12,
        width: '60%',
    },
    wrapperCustom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        borderRadius: 8,
        padding: 6,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: 'cyan',
    },
});