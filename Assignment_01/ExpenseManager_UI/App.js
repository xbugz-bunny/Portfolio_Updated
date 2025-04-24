//https://www.figma.com/design/fzU317u4c7MJwB6SNA6pOH/Personal-Expense-Tracker-(Community)?node-id=516-310&t=0kMGpqIHBLXjsfJo-1

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons (install via npm or use in Snack)

export default function Dashboard() {
  // Sample data for dashboard
  const balance = '$2,000';
  const spent = '$2,000';
  const earned = '$4,000';
  const transactions = [
    { id: 1, title: 'Shoa', description: 'Grocery shopping', amount: '-$100' },
    { id: 2, title: 'Travel', description: 'Indigo ticket', amount: '-$100' },
    { id: 3, title: 'Travel', description: 'Refund ticket', amount: '+$100' },
  ];

  // Handle button presses (simulated for now)
  const handleAddTransaction = () => {
    alert('Add new transaction action triggered!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Available balance</Text>
        <Text style={styles.balanceAmount}>{balance}</Text>
      </View>

      {/* Spent and Earned Section */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Spent</Text>
          <Text style={styles.statValue}>{spent}</Text>
        </View>
        <View style={styles.progressCircle}>
          {/* Placeholder for circular progress (simulated with a semi-circle effect) */}
          <View style={styles.progressFill} />
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Earned</Text>
          <Text style={styles.statValue}>{earned}</Text>
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
        {transactions.map((transaction) => (
          <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Ionicons name="chevron-down-outline" size={20} color={transaction.amount.startsWith('-') ? '#ffffff' : '#000000'} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
            </View>
            <Text style={[styles.transactionAmount, transaction.amount.startsWith('-') ? styles.negativeAmount : styles.positiveAmount]}>
              {transaction.amount}
            </Text>
          </TouchableOpacity>
        ))}
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
    backgroundColor: '#ffffff', // White background for the entire app
  },
  balanceSection: {
    backgroundColor: '#d32f2f', // Deep red background for balance
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
    margin: 15,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#ffffff', // White text
    fontWeight: '500',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    color: '#ffffff', // White text
    fontWeight: 'bold',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#d32f2f', // Deep red background
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: '#ffffff', // White text
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    color: '#ffffff', // White text
    fontWeight: 'bold',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f06292', // Lighter red for progress circle
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#d32f2f', // Deep red border
  },
  progressFill: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff', // White fill for semi-circle effect
    position: 'absolute',
  },
  transactionsSection: {
    padding: 15,
    backgroundColor: '#ffffff', // White background
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 18,
    color: '#d32f2f', // Deep red text
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5', // Very light gray
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d32f2f', // Deep red for icon background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#333333', // Dark gray text
    fontWeight: '500',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666666', // Medium gray text
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  negativeAmount: {
    color: '#d32f2f', // Deep red for negative amounts
  },
  positiveAmount: {
    color: '#4caf50', // Green for positive amounts
  },
  addButton: {
    backgroundColor: '#d32f2f', // Deep red for add button
    padding: 10,
    borderRadius: 50, // Circular button
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'absolute',
    bottom: -25,
    right: 15,
    width: 50,
    height: 50,
  },
});