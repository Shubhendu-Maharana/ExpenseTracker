import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

const {height} = Dimensions.get('window');
const APP_LAUNCHED_KEY = 'appHasLaunched';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem(APP_LAUNCHED_KEY, 'true');
    } catch (error) {
      console.log('Failed to save launch status to AsyncStorage', error);
    } finally {
      navigation.dispatch(StackActions.replace('HomeScreen'));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appName}>Expense Tracker</Text>
        <Text style={styles.subtitle}>
          Take control of your finances with smart tracking and insights
        </Text>
      </View>

      {/* Feature Cards */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, {backgroundColor: '#e8f5e8'}]}>
            <Text style={styles.featureEmoji}>💰</Text>
          </View>
          <Text style={styles.featureTitle}>Track Expenses</Text>
          <Text style={styles.featureDescription}>
            Monitor your spending with easy categorization
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, {backgroundColor: '#fff2e8'}]}>
            <Text style={styles.featureEmoji}>📊</Text>
          </View>
          <Text style={styles.featureTitle}>Visual Insights</Text>
          <Text style={styles.featureDescription}>
            See your money flow with beautiful charts
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, {backgroundColor: '#f0e8ff'}]}>
            <Text style={styles.featureEmoji}>🎯</Text>
          </View>
          <Text style={styles.featureTitle}>Set Goals</Text>
          <Text style={styles.featureDescription}>
            Plan and achieve your financial targets
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.primaryButton}
          activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.06,
  },
  welcomeText: {
    fontSize: 24,
    color: '#6b7280',
    fontWeight: '400',
    marginBottom: 4,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: height * 0.03,
    marginBottom: height * 0.03,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#b7daae',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#b7daae',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
