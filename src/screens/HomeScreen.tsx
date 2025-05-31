import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';
import TransactionItem from '../components/TransactionItem';
import TabButton from '../components/TabButton';
import AddTransactionModal from '../components/AddTransactionModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PieChart from 'react-native-pie-chart';
import {calculateIncomeAndSpent} from '../utils/helperFunctions';
import TransactionModal from '../components/TransactionModal';

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

interface HomeScreenProps {
  userName?: string;
  income?: number;
  spent?: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({userName = 'Shubhendu'}) => {
  const [transactions, setTransactions] = useState<Expense[]>([]);
  const [addTransactionModalVisible, setAddTransactionModalVisible] =
    useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All');
  const [filteredTransactions, setFilteredTransactions] = useState<Expense[]>(
    [],
  );
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Expense | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('transactions');
      if (data) {
        const parsedData = JSON.parse(data);
        const sortedData = parsedData.sort((a: Expense, b: Expense) =>
          b.id.localeCompare(a.id),
        );

        setTransactions(sortedData);
        setFilteredTransactions(sortedData);
        const {income, spent} = calculateIncomeAndSpent(sortedData);
        setTotalIncome(income);
        setTotalSpent(spent);
      } else {
        setTransactions([]);
        setFilteredTransactions([]);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const filteredTransactionsByTab =
      selectedTab === 'All'
        ? transactions
        : transactions.filter(
            transaction => transaction.category === selectedTab,
          );
    const sortedData = filteredTransactionsByTab.sort(
      (a: Expense, b: Expense) => b.id.localeCompare(a.id),
    );
    setFilteredTransactions(sortedData);
  }, [selectedTab, transactions]);

  const handleAddTransaction = async (transaction: {
    amount: string;
    category: string;
    paymentType: string;
    date: string;
  }) => {
    const newTransaction = {
      id: (transactions.length + 1).toString(),
      amount: parseInt(transaction.amount, 10),
      category: transaction.category as Expense['category'],
      paymentType: transaction.paymentType as Expense['paymentType'],
      date: transaction.date,
    };
    await AsyncStorage.setItem(
      'transactions',
      JSON.stringify([...transactions, newTransaction]),
    );
    setTransactions([...transactions, newTransaction]);
    newTransaction.category === 'Salary' ||
    newTransaction.category === 'Freelance'
      ? setTotalIncome(prev => prev + newTransaction.amount)
      : setTotalSpent(prev => prev + newTransaction.amount);
    setAddTransactionModalVisible(false);
  };

  const handleTransactionItemPress = (item: Expense) => {
    setTransactionModalVisible(true);
    setSelectedTransaction(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <FlatList
          data={[
            'All',
            'Food',
            'Salary',
            'Entertainment',
            'Transport',
            'Shopping',
            'Coffee',
            'Freelance',
            'Utilities',
            'Snacks',
          ]}
          renderItem={({item}) => (
            <TabButton
              title={item}
              isActive={item === selectedTab}
              onPress={() => setSelectedTab(item)}
            />
          )}
          keyExtractor={item => item}
          horizontal
          contentContainerStyle={styles.tabContainer}
        />

        {/* Financial Overview */}
        <View style={styles.overviewContainer}>
          <View>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={[styles.indicator, {backgroundColor: '#b7daae'}]}
                />
                <Text style={styles.statLabel}>Income</Text>
              </View>
              <Text style={styles.statAmount}>
                ${totalIncome.toLocaleString()}
              </Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={[styles.indicator, {backgroundColor: '#ffb8a9'}]}
                />
                <Text style={styles.statLabel}>Spent</Text>
              </View>
              <Text style={styles.statAmount}>
                ${totalSpent.toLocaleString()}
              </Text>
            </View>
          </View>
          {totalIncome !== 0 && totalSpent !== 0 && (
            <View style={styles.chartContainer}>
              <PieChart
                widthAndHeight={120}
                series={[
                  {value: totalIncome, color: '#b7daae'},
                  {value: totalSpent, color: '#ffb8a9'},
                ]}
                cover={0.5}
              />
            </View>
          )}
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent transactions</Text>
          </View>

          <View style={styles.transactionsList}>
            {filteredTransactions.length === 0 ? (
              <Text style={styles.noTransactionsText}>
                No transactions found
              </Text>
            ) : (
              filteredTransactions.map(transaction => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onPress={item => handleTransactionItemPress(item)}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setAddTransactionModalVisible(true)}
        style={styles.floatingButton}>
        <Feather name="plus" size={24} color="#333" />
      </TouchableOpacity>

      <AddTransactionModal
        visible={addTransactionModalVisible}
        onClose={() => setAddTransactionModalVisible(false)}
        onAdd={transaction => {
          handleAddTransaction(transaction);
        }}
      />

      <TransactionModal
        transaction={selectedTransaction}
        visible={transactionModalVisible}
        onClose={() => setTransactionModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 24,
    color: '#666666',
    fontWeight: '400',
  },
  userName: {
    fontSize: 32,
    color: '#1A1A1A',
    fontWeight: '700',
    marginTop: -4,
  },
  notificationButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  overviewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 34,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginHorizontal: 24,
  },
  statItem: {
    marginBottom: 20,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  statAmount: {
    fontSize: 28,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  chartContainer: {
    marginLeft: 'auto',
  },
  transactionsContainer: {
    paddingHorizontal: 24,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  transactionsList: {
    gap: 16,
    marginBottom: 60,
  },
  noTransactionsText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 34,
    right: 34,
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#b7daae',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
