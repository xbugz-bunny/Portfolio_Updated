import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons (install via npm or use in Snack)

export default function Dashboard() {
  // State for API data and loading
  const [balance, setBalance] = useState(null);
  const [categories, setCategories] = useState([]);
  const [spent, setSpent] = useState(null);
  const [earned, setEarned] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for animation
  const [showDetails, setShowDetails] = useState([false, false, false]);
  const animatedHeights = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  const animatedOpacities = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  // Mock data for fallback
  const mockData = {
    balance: 2000,
    spent: 1500,
    earned: 3500,
    categories: ['Grocery', 'Travel', 'Refund'],
    transactions: [
      { id: 1, title: 'Grocery', description: 'Grocery shopping', amount: -100 },
      { id: 2, title: 'Travel', description: 'Indigo ticket', amount: -100 },
      { id: 3, title: 'Refund', description: 'Refund ticket', amount: 100 },
    ],
  };

  // Detailed items for each category, summing to $100
  const detailedItems = {
    Grocery: [
      { name: 'Milk', cost: 5 },
      { name: 'Bread', cost: 3 },
      { name: 'Eggs', cost: 4 },
      { name: 'Fruits', cost: 8 },
      { name: 'Vegetables', cost: 10 },
      { name: 'Meat', cost: 20 },
      { name: 'Cereal', cost: 5 },
      { name: 'Snacks', cost: 15 },
      { name: 'Beverages', cost: 10 },
      { name: 'Cleaning Supplies', cost: 20 },
    ],
    Travel: [
      { name: 'Train Ticket', cost: 50 },
      { name: 'Taxi Fare', cost: 30 },
      { name: 'Bus Pass', cost: 20 },
    ],
    Refund: [
      { name: 'Ticket Refund', cost: 60 },
      { name: 'Service Refund', cost: 40 },
    ],
  };

  // Helper function to format numbers as currency
  const formatCurrency = (amount) => {
    if (amount === null) return '';
    const isNegative = amount < 0;
    const formatted = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    return `${isNegative ? '-' : '+'}$${formatted}`;
  };

  // Helper function to generate description based on category
  const generateDescription = (category) => {
    switch (category) {
      case 'Grocery': return 'Grocery shopping';
      case 'Travel': return 'Indigo ticket';
      case 'Refund': return 'Refund ticket';
      default: return 'Miscellaneous';
    }
  };

  // Fetch random numbers and categories from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch balance, spent, earned, and categories
        const [balanceResponse, spentResponse, earnedResponse, categoriesResponse] = await Promise.all([
          fetch('https://www.random.org/integers/?num=1&min=1000&max=5000&col=1&base=10&format=plain'),
          fetch('https://www.random.org/integers/?num=1&min=500&max=3000&col=1&base=10&format=plain'),
          fetch('https://www.random.org/integers/?num=1&min=1000&max=6000&col=1&base=10&format=plain'),
          fetch('https://api.mocki.io/v2/51597f1d/categories'),
        ]);

        if (
          !balanceResponse.ok ||
          !spentResponse.ok ||
          !earnedResponse.ok ||
          !categoriesResponse.ok
        ) {
          throw new Error('Network response was not ok');
        }

        const balanceData = await balanceResponse.text();
        const spentData = await spentResponse.text();
        const earnedData = await earnedResponse.text();
        const categoriesData = await categoriesResponse.json();

        // Log responses for debugging
        console.log('API Responses:', {
          balanceData,
          spentData,
          earnedData,
          categoriesData,
        });

        // Validate and set balance, spent, earned
        const balanceValue = parseInt(balanceData.trim());
        const spentValue = parseInt(spentData.trim());
        const earnedValue = parseInt(earnedData.trim());
        if (isNaN(balanceValue) || isNaN(spentValue) || isNaN(earnedValue)) {
          throw new Error('Invalid number data from API');
        }
        setBalance(balanceValue);
        setSpent(spentValue);
        setEarned(earnedValue);

        // Validate and set categories
        if (!Array.isArray(categoriesData) || categoriesData.length === 0) {
          throw new Error('Invalid categories data from API');
        }
        setCategories(categoriesData);

        // Hardcode transaction amounts to match detailed items
        const transactionData = [
          { id: 1, title: 'Grocery', description: 'Grocery shopping', amount: -100 },
          { id: 2, title: 'Travel', description: 'Indigo ticket', amount: -100 },
          { id: 3, title: 'Refund', description: 'Refund ticket', amount: 100 },
        ];
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to load data from API. Using mock data instead.');

        // Use mock data as fallback
        setBalance(mockData.balance);
        setSpent(mockData.spent);
        setEarned(mockData.earned);
        setCategories(mockData.categories);
        setTransactions(mockData.transactions);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle button presses
  const handleAddTransaction = () => {
    alert('Add new transaction action triggered!');
  };

  // Toggle details with animation
  const toggleDetails = (index) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);

    // Animate height and opacity
    Animated.parallel([
      Animated.timing(animatedHeights[index], {
        toValue: newShowDetails[index] ? 120 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacities[index], {
        toValue: newShowDetails[index] ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d32f2f" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Render main UI
  return (
    <ScrollView style={styles.container}>
      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Available balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
      </View>

      {/* Spent and Earned Section */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Spent</Text>
          <Text style={styles.statValue}>{formatCurrency(spent)}</Text>
        </View>
        <View style={styles.bugsContainer}>
          <Text style={styles.bugsText}>BUGS</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Earned</Text>
          <Text style={styles.statValue}>{formatCurrency(earned)}</Text>
        </View>
      </View>

      {/* Recent Transactions Section */}
      <View style={styles.transactionsSection}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent transactions</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color={transaction.amount < 0 ? '#ffffff' : '#000000'}
                />
              </View>
              <View style={styles.transactionDetails}>
                <TouchableOpacity onPress={() => toggleDetails(index)}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                </TouchableOpacity>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Animated.View
                  style={[
                    styles.itemList,
                    {
                      height: animatedHeights[index],
                      opacity: animatedOpacities[index],
                    },
                  ]}
                >
                  {detailedItems[transaction.title]?.map((item, i) => (
                    <Text key={i} style={styles.itemText}>
                      {item.name}: ${item.cost}
                    </Text>
                  ))}
                </Animated.View>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.amount < 0 ? styles.negativeAmount : styles.positiveAmount,
                ]}
              >
                {formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactionsText}>No transactions available</Text>
        )}
        <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
          <Ionicons name="add-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  balanceSection: {
    backgroundColor: '#d32f2f',
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
    margin: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#d32f2f',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  bugsContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f06292',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#d32f2f',
  },
  bugsText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  transactionsSection: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 18,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 5,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  itemList: {
    paddingTop: 5,
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  negativeAmount: {
    color: '#d32f2f',
  },
  positiveAmount: {
    color: '#4caf50',
  },
  addButton: {
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'absolute',
    bottom: -25,
    right: 15,
    width: 50,
    height: 50,
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
  noTransactionsText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginVertical: 20,
  },
});