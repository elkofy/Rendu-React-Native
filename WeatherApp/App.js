import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Chip, ProgressBar, Text} from 'react-native-paper';
import * as Location from 'expo-location';
import {useEffect, useState} from "react";
import WeatherStatusCard from "./components/WeatherStatusCard";
import ForecastCard from "./components/ForecastCard";

export default function App() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [weather, setWeather] = useState({
        temperature: 0,
        weatherCondition: 'none',
        isLoading: true,
        city: 'unknown',

    });
    const [forecast, setForecast] = useState([]);

    const fetchWeather = async (latitude, longitude) => {
        try {
            const API_KEY = '0077660b6fd618980fad796c54e855b8';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            setWeather({
                temperature: data.main.feels_like - 273.15,
                weatherCondition: data.weather[0].description,
                isLoading: false,
                city: data.name,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            })
        } catch (error) {
            console.log('error fetching weather', error);
        }
    }
    const fetchForecast = async (latitude, longitude) => {
        try {
            const API_KEY = '0077660b6fd618980fad796c54e855b8';
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log('forecast', data['list'].length);
            data['list'].map((item) => {
                setForecast((prev) => [...prev, {
                    temperature: item.main.feels_like - 273.15,
                    weatherCondition: item.weather[0].description,
                    date: item.dt_txt,
                    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                }])
            })
            setLoading(false);
        } catch (error) {
            console.log('error fetching forecast', error);

        }
    }

    useEffect(() => {
        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            await setLocation(location);

            await fetchWeather(location.coords.latitude, location.coords.longitude);
            await fetchForecast(location.coords.latitude, location.coords.longitude);

        })();
    }, []);
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            await setLocation(location);
        })();
    }, [errorMsg]);


    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.header}>Weather</Text>
            <WeatherStatusCard weather={weather}/>
            <Text variant="bodySmall" style={styles.header}>Forecast</Text>
            <View style={styles.weatherContainer}>
                {loading ? <View>
                        <Text>Loading...</Text>
                        <ProgressBar indeterminate={true}/>
                    </View> :
                    <ScrollView>
                        {forecast.map((item, index) => {
                                return (
                                    <ForecastCard item={item} key={index}/>
                                )
                            }
                        )}
                    </ScrollView>}
            </View>

        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 150,
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