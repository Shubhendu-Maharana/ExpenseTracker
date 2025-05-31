import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const TabButton: React.FC<{
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}> = ({title, isActive = false, onPress}) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.activeTab]}
    activeOpacity={0.7}
    onPress={onPress}>
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#F8F8F8',
  },
  activeTab: {
    backgroundColor: '#1A1A1A',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});

export default TabButton;
