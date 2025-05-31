import React from 'react';
import Feather from '@react-native-vector-icons/feather';
import Ionicons from '@react-native-vector-icons/ionicons';

export const getEmoji = (category: string): React.JSX.Element => {
  switch (category) {
    case 'Salary':
      return <Ionicons name="card-outline" size={20} />;
    case 'Entertainment':
      return <Ionicons name="videocam-outline" size={20} />;
    case 'Transport':
      return <Feather name="truck" size={20} />;
    case 'Shopping':
      return <Feather name="shopping-cart" size={20} />;
    case 'Coffee':
      return <Feather name="coffee" size={20} />;
    case 'Freelance':
      return <Feather name="briefcase" size={20} />;
    case 'Utilities':
      return <Feather name="settings" size={20} />;
    case 'Snacks':
      return <Ionicons name="fast-food-outline" size={20} />;
    case 'Food':
      return <Ionicons name="fast-food-outline" size={20} />;
    default:
      return <Feather name="hash" size={20} />;
  }
};
