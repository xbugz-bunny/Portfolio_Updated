import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons (install via npm or use in Snack)

export default function SocialProfile() {
  // State for selected tab
  const [selectedTab, setSelectedTab] = useState('All');

  // Sample data for the profile
  const profile = {
    username: '@not_bugz',
    followers: '4k',
    following: '01',
    profileImage: 'https://static.wikia.nocookie.net/looneytunes/images/7/71/Bugs_Bunny.png', // Specific Bugs Bunny image
  };

  // Placeholder image URLs for the grid (square images, 14 photos)
  const posts = [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
    'https://picsum.photos/200/200?random=4',
    'https://picsum.photos/200/200?random=5',
    'https://picsum.photos/200/200?random=6',
    'https://picsum.photos/200/200?random=7',
    'https://picsum.photos/200/200?random=8',
    'https://picsum.photos/200/200?random=9',
    'https://picsum.photos/200/200?random=10',
    'https://picsum.photos/200/200?random=11',
    'https://picsum.photos/200/200?random=12',
    'https://picsum.photos/200/200?random=13',
    'https://picsum.photos/200/200?random=14',
  ];

  // Handle button presses (simulated for now)
  const handleFollow = () => {
    alert('Follow action triggered!');
  };

  const handleMessage = () => {
    alert('Message action triggered!');
  };

  // Handle tab selection
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: profile.profileImage }} // Specific Bugs Bunny image
            style={styles.profileImage}
            onError={(e) => console.log('Profile image load error:', e.nativeEvent.error)}
          />
          <View style={styles.profileStats}>
            <Text style={styles.statsText}>{profile.followers} Followers</Text>
            <Text style={styles.statsText}>{profile.following} Following</Text>
          </View>
        </View>
        <Text style={styles.username}>{profile.username}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.followButton]} onPress={handleFollow}>
            <Text style={styles.buttonText}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.messageButton]} onPress={handleMessage}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts Grid Section */}
      <View style={styles.postsSection}>
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => handleTabPress('All')}>
            <Text style={[styles.tabText, selectedTab === 'All' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('Photos')}>
            <Text style={[styles.tabText, selectedTab === 'Photos' && styles.activeTabText]}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('Videos')}>
            <Text style={[styles.tabText, selectedTab === 'Videos' && styles.activeTabText]}>Videos</Text>
          </TouchableOpacity>
        </View>
        {selectedTab === 'Videos' ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No videos available</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {posts.map((post, index) => (
              <Image
                key={index}
                source={{ uri: post }} // Random placeholder images
                style={styles.postImage}
                onError={(e) => console.log('Post image load error:', e.nativeEvent.error)}
              />
            ))}
          </View>
        )}
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
    backgroundColor: '#40c4ff', // Teal-blue background for header
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b3e5fc', // Lighter teal-blue border
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80, // Square size (circular due to borderRadius)
    borderRadius: 40, // Circular shape for Bugs Bunny
    backgroundColor: '#e0e0e0', // Light gray fallback if image fails
    marginRight: 15,
  },
  profileStats: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    color: '#ffffff', // White text for contrast
    fontWeight: 'bold',
  },
  username: {
    fontSize: 20,
    color: '#ffffff', // White text for contrast
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  followButton: {
    backgroundColor: '#ffca28', // Vibrant yellow for Follow button
  },
  messageButton: {
    backgroundColor: '#4caf50', // Vibrant green for Message button
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff', // White text for buttons
    fontWeight: 'bold',
  },
  postsSection: {
    backgroundColor: '#e0f7fa', // Light teal-blue background for posts
    padding: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b3e5fc', // Lighter teal-blue border
  },
  tabText: {
    fontSize: 16,
    color: '#2196f3', // Bright blue for tabs
    fontWeight: '500',
  },
  activeTabText: {
    color: '#0d47a1', // Darker blue for active tab
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  postImage: {
    width: '33.33%', // Exactly three images per row
    height: Dimensions.get('window').width * 0.3333, // Square size based on screen width
    margin: 0, // No space between images
    borderRadius: 0, // No rounding to ensure edge-to-edge contact
    borderWidth: 0, // No border
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666', // Medium gray for empty state message
    fontWeight: '500',
  },
});