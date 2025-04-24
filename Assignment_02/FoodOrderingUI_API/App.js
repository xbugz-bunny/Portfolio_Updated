import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import DatePicker from 'react-native-date-picker'; 

export default function FoodDelivery() {
  // State for form fields
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected menu item
  const [menuItems, setMenuItems] = useState([]); // Dynamic menu items from API or fallback
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call

  // Mock data to use as fallback
  const mockMenuItems = [
    { id: 1, name: 'Pizza', price: 12.99 },
    { id: 2, name: 'Burger', price: 8.99 },
    { id: 3, name: 'Sushi', price: 15.99 },
    { id: 4, name: 'Pasta', price: 10.99 },
  ];

  // Fetch random food names from API when component mounts
  useEffect(() => {
    const fetchFoodNames = async () => {
      try {
        setLoading(true);
        // Fetch 4 random food names
        const response = await fetch('https://food-names-api.herokuapp.com/api/Food-Names?number=4');
        const data = await response.json();
        
        // Map API response to menu items with random prices
        const items = data.map((name, index) => ({
          id: index + 1,
          name: name,
          price: (Math.random() * (15 - 5) + 5).toFixed(2), // Random price between $5 and $15
        }));
        
        setMenuItems(items);
        setLoading(false);
      } catch (err) {
        // Use mock data as fallback
        setMenuItems(mockMenuItems);
        setError('Failed to load menu from API. Using default menu items.');
        setLoading(false);
      }
    };

    fetchFoodNames();
  }, []);

  // Format date/time for display
  const formatDateTime = (date) => {
    const options = { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleString('en-US', options).toUpperCase();
  };

  // Handle menu item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  // Handle order submission
  const handleOrder = (method) => {
    if (!selectedItem) {
      alert('Please select a menu item before proceeding.');
      return;
    }
    if (!deliveryAddress && method === 'Delivery') {
      alert('Please enter a delivery address.');
      return;
    }
    alert(`Order placed!\nMethod: ${method}\nItem: ${selectedItem.name}\nPrice: $${selectedItem.price}\n${method === 'Delivery' ? 'Address: ' + deliveryAddress + '\n' : ''}Time: ${formatDateTime(deliveryTime)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Profile and Icons */}
      <View style={styles.header}>
        <View style={styles.profile}>
          <Text style={styles.profileText}>Welcome</Text>
          <Text style={styles.profileName}>Bugs Bunny</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconSpacing}>
            <Ionicons name="settings-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Food Ordering Section */}
      <View style={styles.orderSection}>
        <Text style={styles.heading}>Order Your Food Now</Text>
        <ScrollView contentContainerStyle={styles.orderCard}>
          {/* Delivery Address */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>DELIVERY ADDRESS</Text>
            <TextInput
              style={styles.input}
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              placeholder="Enter delivery address"
              placeholderTextColor="#666666"
            />
          </View>
          {/* Delivery/Pickup Time */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>DELIVERY TIME</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setOpenDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDateTime(deliveryTime)}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openDatePicker}
              date={deliveryTime}
              onConfirm={(date) => {
                setOpenDatePicker(false);
                setDeliveryTime(date);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
              mode="datetime"
              minimumDate={new Date()} // Prevent past dates
            />
          </View>
          {/* Menu Selection */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>MENU</Text>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ea" />
                <Text style={styles.loadingText}>Loading menu...</Text>
              </View>
            ) : (
              <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      selectedItem?.id === item.id && styles.selectedMenuItem,
                    ]}
                    onPress={() => handleItemSelect(item)}
                  >
                    <Text
                      style={[
                        styles.menuItemText,
                        selectedItem?.id === item.id && styles.selectedMenuItemText,
                      ]}
                    >
                      {item.name} (${item.price})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
          </View>
        </ScrollView>

        {/* Order Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.orderButton, !selectedItem && styles.disabledButton]}
            onPress={() => handleOrder('Delivery')}
            disabled={!selectedItem}
          >
            <Text style={styles.orderButtonText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.orderButton, !selectedItem && styles.disabledButton]}
            onPress={() => handleOrder('Carry Out')}
            disabled={!selectedItem}
          >
            <Text style={styles.orderButtonText}>Carry Out</Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1a237e',
  },
  profile: {
    flexDirection: 'column',
  },
  profileText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  profileName: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 10,
  },
  orderSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderCard: {
    paddingBottom: 20,
  },
  inputRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#fafafa',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333333',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  selectedMenuItem: {
    backgroundColor: '#6200ea', // Purple background for selected item
    borderColor: '#6200ea',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedMenuItemText: {
    color: '#ffffff', // White text for selected item
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: '#ff1744',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '48%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  orderButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1a237e',
  },
  footerText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#ff1744',
    textAlign: 'center',
    padding: 20,
  },
});