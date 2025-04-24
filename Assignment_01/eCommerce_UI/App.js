//https://www.figma.com/design/1QIn5TK99ihbYbxUJ3UvBn/E-Commerce-UI-Art-Gallery?node-id=4-2&t=SirtshOOYJKDcRKL-1

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons (install via npm or use in Snack)

export default function ArtProductPage() {
  // Sample data for the profile and products
  const profile = {
    name: 'Bugs Bunny',
  };

  // Random placeholder image URLs for headphones (replace with actual URLs if needed)
  const featuredProduct = {
    name: 'TMA-2 Modular Portrait',
    price: 'USD 350',
    image: 'https://picsum.photos/200/200?random=1', // Random headphone image
  };

  const featuredProducts = [
    {
      id: 1,
      name: 'TMA-2 Portrait',
      price: 'USD 350',
      image: 'https://picsum.photos/200/200?random=2', // Random headphone image
    },
    {
      id: 2,
      name: 'CO2 - Portrait',
      price: 'USD 25',
      image: 'https://picsum.photos/200/200?random=3', // Random headphone image
    },
  ];

  // State for search input
  const [searchQuery, setSearchQuery] = React.useState('');

  // Handle button presses (simulated for now)
  const handleShopNow = () => {
    alert('Shop TMA-2 Modular Portrait now!');
  };

  const handleSeeAll = () => {
    alert('See all featured products action triggered!');
  };

  // Handle navigation icon presses (simulated for now)
  const handleNavigate = (section) => {
    alert(`Navigate to ${section} section!`);
  };

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
                source={{ uri: 'https://picsum.photos/50/50?random=4' }} // Random profile image
                style={styles.profileImage}
                onError={(e) => console.log('Profile image load error:', e.nativeEvent.error)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hi, Bugs Bunny</Text>
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
      <View style={styles.featuredProductSection}>
        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>TMA-2 Modular Portrait</Text>
          <View style={styles.featuredContent}>
            <Image
              source={{ uri: featuredProduct.image }} // Random headphone image
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

      {/* Featured Products Section */}
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
                source={{ uri: product.image }} // Random headphone image
                style={styles.productImage}
                onError={(e) => console.log('Product image load error:', e.nativeEvent.error)}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background for the entire app
  },
  header: {
    backgroundColor: '#ffffff', // White background for header
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
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
    backgroundColor: '#ffffff', // White background for navbar
  },
  brand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50', // Green text for brand
  },
  navIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15, // Rounded profile image
    backgroundColor: '#e0e0e0', // Light gray fallback if image fails
  },
  greeting: {
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Dark gray text
    marginBottom: 5,
  },
  searchPrompt: {
    fontSize: 16,
    color: '#666666', // Medium gray text
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Very light gray for search
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '90%',
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#4caf50', // Green border for search
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333', // Dark gray text
    paddingVertical: 0,
  },
  searchIcon: {
    marginLeft: 10,
  },
  featuredProductSection: {
    padding: 15,
    backgroundColor: '#ffffff', // White background for featured product
  },
  featuredCard: {
    backgroundColor: '#f5f5f5', // Very light gray for featured card
    padding: 15,
    borderRadius: 15, // Rounded corners for card
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Dark gray text
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
    borderRadius: 10, // Slight rounding for image
    backgroundColor: '#e0e0e0', // Light gray fallback if image fails
  },
  shopNowButton: {
    backgroundColor: '#4caf50', // Green for Shop now button
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15, // Rounded button
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shopNowText: {
    fontSize: 14,
    color: '#ffffff', // White text
    fontWeight: 'bold',
  },
  featuredPrice: {
    fontSize: 16,
    color: '#4caf50', // Green for price
    fontWeight: 'bold',
  },
  productsSection: {
    padding: 15,
    backgroundColor: '#ffffff', // White background for products
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
    color: '#333333', // Dark gray text
  },
  seeAllText: {
    fontSize: 16,
    color: '#4caf50', // Green for See All
    fontWeight: '500',
  },
  productGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f5f5f5', // Very light gray for product cards
    padding: 10,
    borderRadius: 15, // Rounded corners for cards
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10, // Slight rounding for image
    marginBottom: 10,
    backgroundColor: '#e0e0e0', // Light gray fallback if image fails
  },
  productName: {
    fontSize: 16,
    color: '#333333', // Dark gray text
    fontWeight: '500',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#4caf50', // Green for price
    fontWeight: 'bold',
  },
});