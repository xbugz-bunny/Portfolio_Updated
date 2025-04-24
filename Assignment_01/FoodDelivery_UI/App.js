import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons (install via npm or use in Snack)

export default function FoodDeliveryTracker() {
  // State for selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data for food categories with provided image URLs
  const foodCategories = [
    {
      id: 1,
      name: 'Burger',
      image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg',
      rating: '97%',
    },
    {
      id: 2,
      name: 'Pizza',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkdf8ctbARHWXlRXKffmqBriFgjBmxtQtMoi4llsghy1SDfU4ltOtsikKja2LQszODsWs&usqp=CAU',
      rating: '95%',
    },
  ];

  // Handle button presses
  const handleDelivery = () => {
    if (!selectedItem) {
      alert('Please select a food category before proceeding.');
      return;
    }
    alert(`Delivery order started for ${selectedItem.name}!`);
  };

  const handleCarryOut = () => {
    if (!selectedItem) {
      alert('Please select a food category before proceeding.');
      return;
    }
    alert(`Carry out order started for ${selectedItem.name}!`);
  };

  const handleNavigate = (section) => {
    alert(`Navigate to ${section} section!`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleNavigate('Menu')}>
          <Ionicons name="menu-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Bugs Food Delivery</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Order Type Section */}
      <View style={styles.orderSection}>
        <Text style={styles.orderTitle}>TRACKER</Text>
        <Text style={styles.orderSubtitle}>START YOUR ORDER</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.orderButton, styles.deliveryButton, !selectedItem && styles.disabledButton]} 
            onPress={handleDelivery}
            disabled={!selectedItem}
          >
            <Text style={styles.buttonText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.orderButton, styles.carryOutButton, !selectedItem && styles.disabledButton]} 
            onPress={handleCarryOut}
            disabled={!selectedItem}
          >
            <Text style={styles.buttonText}>Carry Out</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.categoryPrompt}>FOOD CATEGORIES</Text>
        <Text style={styles.categoryQuestion}>What do you need?</Text>
      </View>

      {/* Food Categories Section */}
      <View style={styles.categoriesSection}>
        {foodCategories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={[
              styles.categoryCard,
              selectedItem?.id === category.id && styles.selectedCategoryCard
            ]}
            onPress={() => setSelectedItem(category)}
          >
            <Image
              source={{ uri: category.image }} // Provided image URLs
              style={styles.categoryImage}
              onError={(e) => console.log('Category image load error:', e.nativeEvent.error)}
            />
            <View style={styles.categoryInfo}>
              <Text 
                style={[
                  styles.categoryName,
                  selectedItem?.id === category.id && styles.selectedCategoryName
                ]}
              >
                {category.name}
              </Text>
              <Text style={styles.categoryRating}>{category.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleNavigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#ab47bc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Search')}>
          <Ionicons name="search-outline" size={24} color="#ab47bc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Orders')}>
          <Ionicons name="list-outline" size={24} color="#ab47bc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Account')}>
          <Ionicons name="person-outline" size={24} color="#ab47bc" />
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ab47bc', // Purple background for header
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
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
    width: 24, // Matching the space for the profile icon in the screenshot
  },
  orderSection: {
    padding: 20,
    backgroundColor: '#ffffff', // White background for order section
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 14,
    color: '#ab47bc', // Purple text
    fontWeight: '500',
    marginBottom: 5,
  },
  orderSubtitle: {
    fontSize: 16,
    color: '#666666', // Medium gray text
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  orderButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  deliveryButton: {
    backgroundColor: '#ab47bc', // Purple for Delivery button
  },
  carryOutButton: {
    backgroundColor: '#ab47bc', // Lighter purple for Carry Out button
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Gray for disabled state
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff', // White text
    fontWeight: 'bold',
  },
  categoryPrompt: {
    fontSize: 14,
    color: '#ab47bc', // Purple text
    fontWeight: '500',
    marginBottom: 5,
  },
  categoryQuestion: {
    fontSize: 16,
    color: '#666666', // Medium gray text
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff', // White background for categories
  },
  categoryCard: {
    backgroundColor: '#f5f5f5', // Very light gray for category cards
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCategoryCard: {
    backgroundColor: '#ab47bc', // Purple background for selected item
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10, // Slight rounding for image
    backgroundColor: '#e0e0e0', // Light gray fallback if image fails
  },
  categoryInfo: {
    alignItems: 'flex-end',
  },
  categoryName: {
    fontSize: 18,
    color: '#ab47bc', // Purple text
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedCategoryName: {
    color: '#ffffff', // White text for selected item
  },
  categoryRating: {
    fontSize: 14,
    color: '#666666', // Medium gray text
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ab47bc', // Purple background for footer
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});