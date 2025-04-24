import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const cityName = 'Islamabad';
  const temperature = '11°C';
  const weatherDescription = 'Rain';


  const getWeatherIcon = (description) => {
    if (description.includes('Cloudy')) {
      return 'weather-cloudy';
    } else if (description.includes('Sunny')) {
      return 'weather-sunny';
    } else if (description.includes('Rain')) {
      return 'weather-rainy';
    } else if (description.includes('Snow')) {
      return 'weather-snowy';
    } else {
      return 'weather-partly-cloudy'; 
    }
  };

  const weatherIcon = getWeatherIcon(weatherDescription);

  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{cityName}</Text>
      <MaterialCommunityIcons
        name={weatherIcon}
        size={100}
        color="#FFA5"
        style={styles.icon}
      />
      <Text style={styles.temperature}>{temperature}</Text>
      <Text style={styles.description}>{weatherDescription}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 24,
    color: '#D3D3D3',
  },
});