import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { appColor } from '@/constants/appColor.constant';
import { Ionicons } from '@expo/vector-icons';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl: string | null;
  roleName: string;
  customer: {
    address: string;
    accountLevel: string;
  };
  createAt: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = require('../../services/stores/profile.json');
        setProfileData(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  if (!profileData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {profileData.imageUrl ? (
              <Image
                source={{ uri: profileData.imageUrl }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {`${profileData.firstName?.[0] || ''}${profileData.lastName?.[0] || ''}`}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>
            {`${profileData.firstName || ''} ${profileData.lastName || ''}`}
          </Text>
          <Text style={styles.role}>{profileData.roleName.replace('ROLE_', '')}</Text>
        </View>

        {/* Info Sections */}
        <View style={styles.section}>
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color={appColor.TEXT} />
            <Text style={styles.infoText}>{profileData.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color={appColor.TEXT} />
            <Text style={styles.infoText}>{profileData.phone || 'Chưa cập nhật'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color={appColor.TEXT} />
            <Text style={styles.infoText}>{profileData.customer.address || 'Chưa cập nhật'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="star-outline" size={20} color={appColor.TEXT} />
            <Text style={styles.infoText}>{profileData.customer.accountLevel}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color={appColor.TEXT} />
            <Text style={styles.infoText}>Tham gia: {formatDate(profileData.createAt)}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={appColor.WHITE} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: appColor.GRAY3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: appColor.BG_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: appColor.WHITE,
    fontSize: 32,
    fontFamily: 'outfit-bold',
  },
  name: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    color: appColor.TEXT,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: appColor.TEXT_GRAY,
    fontFamily: 'outfit',
  },
  section: {
    padding: 16,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: appColor.GRAY3,
    borderRadius: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: appColor.TEXT,
    fontFamily: 'outfit',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColor.BG_PRIMARY,
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: appColor.WHITE,
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
});

export default Profile;