import {StyleSheet, View,Image} from "react-native";
import {Chip, Text} from 'react-native-paper';

export default function WeatherStatusCard({weather}) {
    return (
        <View >
            <Chip icon="city">{weather.city}</Chip>
            <Chip icon="thermometer">{Number.parseFloat(weather.temperature).toFixed(2)} °C</Chip>
            <Chip avatar={ <Image source={{uri: weather.icon}}
                                  style={{width: 25, height: 25}}/>} style={{height: '3px'}} >
               {weather.weatherCondition} </Chip>
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