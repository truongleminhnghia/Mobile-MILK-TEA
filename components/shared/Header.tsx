import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { appColor } from '../../constants/appColor.constant';

interface HeaderProps {
  showBack?: boolean;
  showMenu?: boolean;
  onSearch?: (text: string) => void;
}

export default function Header({ showBack = true, showMenu = true, onSearch }: HeaderProps) {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={appColor.BG_PRIMARY} />
        </TouchableOpacity>
      )}
      
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={onSearch}
          placeholderTextColor={appColor.GRAY1}
        />
      </View>

      {showMenu && (
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={24} color={appColor.BG_PRIMARY} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: appColor.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: appColor.GRAY3,
  },
  iconButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  searchInput: {
    backgroundColor: appColor.GRAY3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: appColor.TEXT,
  },
}); 