import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {formatDate, generatePastelColor} from '../utils/helperFunctions';
import {getEmoji} from '../utils/getEmoji';

interface Expense {
  id: string;
  amount: number;
  category:
    | 'Food'
    | 'Salary'
    | 'Entertainment'
    | 'Transport'
    | 'Shopping'
    | 'Coffee'
    | 'Freelance'
    | 'Utilities'
    | 'Snacks';
  paymentType: 'Cash' | 'Card' | 'UPI';
  date: string;
}

const TransactionItem: React.FC<{
  transaction: Expense;
  onPress: (item: Expense) => void;
}> = ({transaction, onPress}) => (
  <TouchableOpacity
    onPress={() => onPress(transaction)}
    style={styles.transactionItem}>
    <View
      style={[
        styles.transactionIcon,
        {backgroundColor: generatePastelColor(parseInt(transaction.id, 10))},
      ]}>
      {getEmoji(transaction.category)}
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionTitle}>{transaction.category}</Text>
      <Text style={styles.transactionSubtitle}>{transaction.paymentType}</Text>
    </View>
    <View style={styles.transactionAmount}>
      <Text
        style={[
          styles.amountText,
          {
            color: `${
              transaction.category === 'Salary' ||
              transaction.category === 'Freelance'
                ? '#4CAF50'
                : '#FF6B6B'
            }`,
          },
        ]}>
        ${transaction.amount.toLocaleString()}
      </Text>
      <Text style={styles.dateText}>{formatDate(transaction.date)}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '400',
  },
});

export default TransactionItem;
