import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons (install via npm or use in Snack)

export default function ArtProductPage() {
  // State for API data and loading
  const [profile, setProfile] = useState(null);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from Fake Store API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch profile and products concurrently
        const [profileResponse, productsResponse] = await Promise.all([
          fetch('https://fakestoreapi.com/users/1'),
          fetch('https://fakestoreapi.com/products?limit=3'), // Limit to 3 products
        ]);

        if (!profileResponse.ok || !productsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const profileData = await profileResponse.json();
        const productsData = await productsResponse.json();

        // Map profile data
        setProfile({
          name: profileData.Bugs,
        });

        // Map featured product (first product)
        setFeaturedProduct({
          name: productsData[0].title.slice(0, 20), // Shorten title for display
          price: `USD ${productsData[0].price.toFixed(2)}`,
          image: productsData[0].image || 'https://picsum.photos/200/200?random=1', // Fallback image
        });

        // Map featured products (remaining products)
        setFeaturedProducts(
          productsData.slice(1).map((product, index) => ({
            id: product.id,
            name: product.title.slice(0, 20), // Shorten title
            price: `USD ${product.price.toFixed(2)}`,
            image: product.image || `https://picsum.photos/200/200?random=${index + 2}`, // Fallback images
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle button presses
  const handleShopNow = () => {
    alert('Shop now clicked!');
  };

  const handleSeeAll = () => {
    alert('See all featured products action triggered!');
  };

  const handleNavigate = (section) => {
    alert(`Navigate to ${section} section!`);
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Render main UI
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => handleNavigate('Menu')}>
            <Ionicons name="menu-outline" size={20} color="#4caf50" />
          </TouchableOpacity>
          <Text style={styles.brand}>Art</Text>
          <View style={styles.navIcons}>
            <TouchableOpacity onPress={() => handleNavigate('Profile')}>
              <Image
                source={{ uri: 'https://picsum.photos/50/50?random=4' }} // Static profile image
                style={styles.profileImage}
                onError={(e) => console.log('Profile image load error:', e.nativeEvent.error)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Welcome, {profile?.name || 'BugsBunny'}</Text>
          <Text style={styles.searchPrompt}>What are you looking for today?</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search Art"
            placeholderTextColor="#666666"
          />
          <Ionicons name="search-outline" size={20} color="#4caf50" style={styles.searchIcon} />
        </View>
      </View>

      {/* Featured Product Section */}
      {featuredProduct && (
        <View style={styles.featuredProductSection}>
          <View style={styles.featuredCard}>
            <Text style={styles.featuredTitle}>{featuredProduct.name}</Text>
            <View style={styles.featuredContent}>
              <Image
                source={{ uri: featuredProduct.image }}
                style={styles.featuredImage}
                onError={(e) => console.log('Featured image load error:', e.nativeEvent.error)}
              />
              <TouchableOpacity style={styles.shopNowButton} onPress={handleShopNow}>
                <Text style={styles.shopNowText}>Shop now <Ionicons name="arrow-forward-outline" size={16} color="#ffffff" /></Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.featuredPrice}>{featuredProduct.price}</Text>
          </View>
        </View>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <View style={styles.productsSection}>
          <View style={styles.productsHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productGrid}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  onError={(e) => console.log('Product image load error:', e.nativeEvent.error)}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  brand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  navIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
  },
  greeting: {
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  searchPrompt: {
    fontSize: 16,
    color: '#666666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '90%',
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#4caf50',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingVertical: 0,
  },
  searchIcon: {
    marginLeft: 10,
  },
  featuredProductSection: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  featuredCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  featuredContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  shopNowButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shopNowText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  featuredPrice: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  productsSection: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: '500',
  },
  productGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  productName: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
  },
});