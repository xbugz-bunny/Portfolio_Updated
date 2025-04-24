import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Picker,
  Platform,
  TextInput
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons

export default function FlightBooking() {
  // State for form inputs, distance, and duration
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState(null);
  const [flightDuration, setFlightDuration] = useState(null);

  // Sample airport data with IATA codes and coordinates
  const airports = [
    { id: 1, name: 'New York (JFK)', iata: 'JFK', lat: 40.6398, lon: -73.7789 },
    { id: 2, name: 'Los Angeles (LAX)', iata: 'LAX', lat: 33.9425, lon: -118.4081 },
    { id: 3, name: 'London (LHR)', iata: 'LHR', lat: 51.4706, lon: -0.4619 },
    { id: 4, name: 'Tokyo (NRT)', iata: 'NRT', lat: 35.7647, lon: 140.3863 },
    { id: 5, name: 'Islamabad (ISB)', iata: 'ISB', lat: 33.6167, lon: 73.0992 },
    { id: 6, name: 'Lahore (LHE)', iata: 'LHE', lat: 31.5216, lon: 74.4036 },
  ];

  // Haversine formula to calculate distance between two coordinates (in km)
  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate flight duration from distance (in km)
  const calculateFlightDuration = (distance) => {
    const speedKmh = 885; // 550 mph
    const extraTimeHours = 0.5; // Takeoff/landing
    const durationHours = distance / speedKmh + extraTimeHours;
    const hours = Math.floor(durationHours);
    const minutes = Math.round((durationHours - hours) * 60);
    return { hours, minutes };
  };

  // Fetch distance from Aviation Edge API or fallback to Haversine
  useEffect(() => {
    if (!departure || !destination || departure === destination) {
      setDistance(null);
      setFlightDuration(null);
      return;
    }

    const departureAirport = airports.find(a => a.name === departure);
    const destinationAirport = airports.find(a => a.name === destination);
    
    if (!departureAirport || !destinationAirport) return;

    const API_KEY = 'YOUR_AVIATION_EDGE_API_KEY'; // Replace with your API key
    const url = `https://aviation-edge.com/v2/public/airportDistance?key=${API_KEY}&from=${departureAirport.iata}&to=${destinationAirport.iata}&unit=km`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.distance) {
          setDistance(data.distance.toFixed(1));
          setFlightDuration(calculateFlightDuration(data.distance));
        } else {
          throw new Error(data.errorMessage || 'API error');
        }
      })
      .catch(error => {
        console.error('API Error:', error);
        // Silent Haversine fallback
        const dist = calculateHaversineDistance(
          departureAirport.lat,
          departureAirport.lon,
          destinationAirport.lat,
          destinationAirport.lon
        );
        setDistance(dist.toFixed(1));
        setFlightDuration(calculateFlightDuration(dist));
      });
  }, [departure, destination]);

  // Handle date change for web input
  const handleDateChange = (text) => {
    const selectedDate = new Date(text);
    if (!isNaN(selectedDate)) {
      setDate(selectedDate);
    }
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!departure || !destination || !date) {
      alert('Please fill in all fields before confirming.');
      return;
    }
    if (departure === destination) {
      alert('Departure and destination cannot be the same.');
      return;
    }
    const durationText = flightDuration ? `${flightDuration.hours}h ${flightDuration.minutes}m` : 'N/A';
    alert(`Booking confirmed!\nFrom: ${departure}\nTo: ${destination}\nDate: ${date.toDateString()}\nDistance: ${distance ? distance + ' km' : 'N/A'}\nFlight Duration: ${durationText}`);
  };

  // Handle navigation (placeholder)
  const handleNavigate = (section) => {
    alert(`Navigate to ${section} section!`);
  };

  // Format date for input value (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleNavigate('Menu')}>
          <Ionicons name="menu-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Flight Booking</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Booking Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>FLIGHT BOOKING</Text>
        <Text style={styles.formSubtitle}>Plan Your Trip</Text>

        {/* Departure Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Departure</Text>
          <Picker
            selectedValue={departure}
            onValueChange={(itemValue) => setDeparture(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select departure" value="" />
            {airports.map((airport) => (
              <Picker.Item key={airport.id} label={airport.name} value={airport.name} />
            ))}
          </Picker>
        </View>

        {/* Destination Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Destination</Text>
          <Picker
            selectedValue={destination}
            onValueChange={(itemValue) => setDestination(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select destination" value="" />
            {airports.map((airport) => (
              <Picker.Item key={airport.id} label={airport.name} value={airport.name} />
            ))}
          </Picker>
        </View>

        {/* Date Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Flight Date</Text>
          {Platform.OS === 'web' ? (
            <TextInput
              style={styles.dateInput}
              value={formatDateForInput(date)}
              onChangeText={handleDateChange}
              type="date"
              min={formatDateForInput(new Date())} // Prevent past dates
            />
          ) : (
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => alert('Native date picker not implemented in this example')}
            >
              <Text style={styles.dateButtonText}>
                {date.toDateString()}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Distance and Duration Display */}
        {distance && flightDuration && (
          <Text style={styles.distanceText}>
            Distance: {distance} km, Flight Duration: {flightDuration.hours}h {flightDuration.minutes}m
          </Text>
        )}

        {/* Confirm Booking Button */}
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            (!departure || !destination || !date) && styles.disabledButton
          ]}
          onPress={handleConfirmBooking}
          disabled={!departure || !destination || !date}
        >
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleNavigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#333333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Search')}>
          <Ionicons name="search-outline" size={24} color="#333333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Bookings')}>
          <Ionicons name="list-outline" size={24} color="#333333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Account')}>
          <Ionicons name="person-outline" size={24} color="#333333" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#333333', // Dark gray header
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 18,
    color: '#ffffff', // White text
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 24,
  },
  formSection: {
    padding: 20,
    backgroundColor: '#ffffff', // White background
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 14,
    color: '#333333', // Dark gray text
    fontWeight: '500',
    marginBottom: 5,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#999999', // Medium gray text
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333333', // Dark gray text
    fontWeight: '500',
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 44,
    backgroundColor: '#f5f5f5', // Light gray background
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#333333', // Dark gray text
  },
  dateButton: {
    backgroundColor: '#f5f5f5', // Light gray background
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333333', // Dark gray text
  },
  dateInput: {
    backgroundColor: '#f5f5f5', // Light gray background
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333333', // Dark gray text
    width: '100%',
  },
  distanceText: {
    fontSize: 14,
    color: '#333333', // Dark gray text
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#333333', // Dark gray button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Gray for disabled state
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff', // White text
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5', // Light gray footer
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});