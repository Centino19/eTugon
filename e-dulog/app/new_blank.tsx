import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProfilePage() {
  const router = useRouter();

  // Sample user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "January 2023",
    reports: 12,
    upvotes: 47,
    issuesResolved: 8,
    avatar: require('@/assets/images/profile-pic.jpg'),
    level: "Community Champion",
    points: 1250
  };

  const recentActivity = [
    { type: 'report', title: 'Reported Broken Street Light', time: '2 hours ago' },
    { type: 'upvote', title: 'Upvoted Flooded Road Issue', time: '1 day ago' },
    { type: 'comment', title: 'Commented on Park Maintenance', time: '2 days ago' },
    { type: 'resolve', title: 'Damaged Pavement Issue Resolved', time: '3 days ago' },
  ];

  const menuItems = [
    { icon: "user", title: "Personal Information", color: "#4cd137" },
    { icon: "shield", title: "Privacy & Security", color: "#3498db" },
    { icon: "bell", title: "Notifications", color: "#9b59b6" },
    { icon: "trophy", title: "Achievements", color: "#f1c40f" },
    { icon: "question-circle", title: "Help & Support", color: "#e67e22" },
    { icon: "info-circle", title: "About", color: "#7f8c8d" },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#004a89', '#0074c2', '#004a89']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <FontAwesome name="cog" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Image source={user.avatar} style={styles.avatar} />
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userLevel}>{user.level}</Text>
                <View style={styles.pointsContainer}>
                  <FontAwesome name="star" size={16} color="#f1c40f" />
                  <Text style={styles.pointsText}>{user.points} points</Text>
                </View>
              </View>
            </View>

            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.joinDate}>Member since {user.joinDate}</Text>

            {/* Stats Dashboard */}
            <View style={styles.statsDashboard}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(52, 152, 219, 0.2)' }]}>
                  <FontAwesome name="file-text" size={20} color="#3498db" />
                </View>
                <Text style={styles.statNumber}>{user.reports}</Text>
                <Text style={styles.statLabel}>Reports</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(46, 204, 113, 0.2)' }]}>
                  <FontAwesome name="thumbs-up" size={20} color="#2ecc71" />
                </View>
                <Text style={styles.statNumber}>{user.upvotes}</Text>
                <Text style={styles.statLabel}>Upvotes</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(241, 196, 15, 0.2)' }]}>
                  <FontAwesome name="check-circle" size={20} color="#f1c40f" />
                </View>
                <Text style={styles.statNumber}>{user.issuesResolved}</Text>
                <Text style={styles.statLabel}>Resolved</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentActivity.map((activity, index) => (
              <TouchableOpacity key={index} style={styles.activityItem}>
                <View style={[styles.activityIcon,
                  { backgroundColor: activity.type === 'report' ? 'rgba(231, 76, 60, 0.2)' :
                                  activity.type === 'upvote' ? 'rgba(46, 204, 113, 0.2)' :
                                  activity.type === 'comment' ? 'rgba(52, 152, 219, 0.2)' :
                                  'rgba(241, 196, 15, 0.2)' }]}>
                  <FontAwesome
                    name={activity.type === 'report' ? 'exclamation-circle' :
                          activity.type === 'upvote' ? 'thumbs-up' :
                          activity.type === 'comment' ? 'comment' : 'check-circle'}
                    size={16}
                    color={activity.type === 'report' ? '#e74c3c' :
                          activity.type === 'upvote' ? '#2ecc71' :
                          activity.type === 'comment' ? '#3498db' : '#f1c40f'}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Menu Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                    <FontAwesome name={item.icon} size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <FontAwesome name="angle-right" size={20} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <FontAwesome name="sign-out" size={20} color="#ff3b30" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>

      </LinearGradient>

      {/* Bottom Navigation */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.bottomTabButton}
          onPress={() => router.push('/blank')}
        >
          <FontAwesome name="list" size={24} color="gray" />
          <Text style={styles.bottomTabText}>Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTabButton}>
          <FontAwesome name="user" size={24} color="#004a89" />
          <Text style={[styles.bottomTabText, { color: '#004a89' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#004a89',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 14,
    color: '#004a89',
    fontWeight: '600',
    marginBottom: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 20,
  },
  statsDashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#95a5a6',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  bottomTabButton: {
    alignItems: 'center',
  },
  bottomTabText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});