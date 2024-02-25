import {StyleSheet, View, Image} from "react-native";
import {Chip, Divider, Icon, Text} from 'react-native-paper';
import {flex} from "nativewind/dist/postcss/to-react-native/properties/flex";

function getParsedDate(strDate) {
    const strSplitDate = String(strDate).split(' ');
    let date = new Date(strSplitDate[0]);
    // alert(date);
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!

    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + "/" + mm + "/" + yyyy;
    return date.toString();
}

export default function ForecastCard({item}) {
    return (
        <View style={{marginTop: 6}}>
            <Divider/>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                    source="clock"
                    size={30}
                />
                <Text variant="bodyLarge">{getParsedDate(item.date)}</Text>

            </View>
            <Chip avatar={<Image source={{uri: item.icon}}
                                 style={{width: 25, height: 25}}/>} style={{height: '3px'}}>
                {item.weatherCondition} </Chip>
            <Chip icon="thermometer">{Number.parseFloat(item.temperature).toFixed(2)} °C</Chip>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '30%',
        backgroundColor: '#fff',
        marginTop: 50,
    },
    weatherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100px',
    },
    header: {
        fontSize: 36,
    },
    tempText: {
        fontSize: 48,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 36,
        color: '#000'
    },
    subTitle: {
        fontSize: 24,
        color: '#000'
    },
});