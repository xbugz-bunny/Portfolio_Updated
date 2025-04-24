import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Disney API configuration
const DISNEY_API_URL = 'https://api.disneyapi.dev/character';
const PAGE_SIZE = 20;

// Main Screen Component
const MoviesScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = async (currentPage = 1) => {
    try {
      const response = await axios.get(`${DISNEY_API_URL}?page=${currentPage}&pageSize=${PAGE_SIZE}`);
      if (currentPage === 1) {
        setMovies(response.data.data);
      } else {
        setMovies(prev => [...prev, ...response.data.data]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchMovies(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.movieCard}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.movieImage}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.name}</Text>
        {item.tvShows.length > 0 && (
          <Text style={styles.movieSubtitle}>Appears in: {item.tvShows[0]}</Text>
        )}
        {item.films.length > 0 && (
          <Text style={styles.movieSubtitle}>Films: {item.films[0]}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Disney Characters & Movies</Text>
      </View>
      
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item._id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() => (
          loading ? <ActivityIndicator size="small" color="#0000ff" /> : null
        )}
      />
    </SafeAreaView>
  );
};

// Detail Screen Component
const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <SafeAreaView style={styles.detailContainer}>
      <Image 
        source={{ uri: movie.imageUrl }} 
        style={styles.detailImage}
        resizeMode="contain"
      />
      <View style={styles.detailContent}>
        <Text style={styles.detailTitle}>{movie.name}</Text>
        
        {movie.tvShows.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>TV Shows:</Text>
            {movie.tvShows.map((show, index) => (
              <Text key={index} style={styles.detailText}>• {show}</Text>
            ))}
          </View>
        )}
        
        {movie.films.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Films:</Text>
            {movie.films.map((film, index) => (
              <Text key={index} style={styles.detailText}>• {film}</Text>
            ))}
          </View>
        )}
        
        {movie.videoGames.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Video Games:</Text>
            {movie.videoGames.map((game, index) => (
              <Text key={index} style={styles.detailText}>• {game}</Text>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// Navigation Stack
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Movies">
        <Stack.Screen 
          name="Movies" 
          component={MoviesScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MovieDetail" 
          component={MovieDetailScreen} 
          options={{ title: 'Character Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  movieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  movieImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 16,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  movieSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailImage: {
    width: '100%',
    height: 300,
  },
  detailContent: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailSection: {
    marginBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
    marginBottom: 4,
  },
});

export default App;