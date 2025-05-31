import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PaymentTypeOption from './PaymentTypeOption';
import {getEmoji} from '../utils/getEmoji';
import Ionicons from '@react-native-vector-icons/ionicons';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (transaction: TransactionData) => void;
}

interface TransactionData {
  amount: string;
  category: string;
  paymentType: string;
  date: string;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [selectedPaymentType, setSelectedPaymentType] = useState('Cash');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const categories = [
    {id: '1', name: 'Food'},
    {id: '2', name: 'Salary'},
    {id: '3', name: 'Entertainment'},
    {id: '4', name: 'Transport'},
    {id: '5', name: 'Shopping'},
    {id: '6', name: 'Coffee'},
    {id: '7', name: 'Freelance'},
    {id: '8', name: 'Utilities'},
    {id: '9', name: 'Snacks'},
  ];

  const paymentTypes = ['Cash', 'Card', 'UPI'];

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year:
          date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleAdd = () => {
    if (amount === '0') {
      Alert.alert('Invalid amount', 'Please enter an amount');
      return;
    }
    const transaction: TransactionData = {
      amount,
      category: selectedCategory,
      paymentType: selectedPaymentType,
      date: selectedDate.toISOString(),
    };
    onAdd(transaction);
    setAmount('0');
    setSelectedCategory('Food');
    setSelectedPaymentType('Cash');
    setSelectedDate(new Date());
    onClose();
  };

  const resetForm = () => {
    setAmount('0');
    setSelectedCategory('Food');
    setSelectedPaymentType('Cash');
    setSelectedDate(new Date());
    setShowCategoryDropdown(false);
    setShowDatePicker(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add transaction</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            {/* Amount Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Amount</Text>
              <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                />
              </View>
            </View>

            {/* Category Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Category</Text>
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                activeOpacity={0.7}>
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryIcon}>
                    {getEmoji(selectedCategory)}
                  </Text>
                  <Text style={styles.categoryName}>{selectedCategory}</Text>
                </View>
                <Text style={styles.dropdownIcon}>›</Text>
              </TouchableOpacity>

              {/* Category Dropdown */}
              {showCategoryDropdown && (
                <View style={styles.dropdown}>
                  {categories.map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedCategory(category.name);
                        setShowCategoryDropdown(false);
                      }}
                      activeOpacity={0.7}>
                      <Text style={styles.categoryIcon}>
                        {getEmoji(category.name)}
                      </Text>
                      <Text style={styles.categoryName}>{category.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Date Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}>
                <View style={styles.dateContent}>
                  <Ionicons
                    style={styles.dateIcon}
                    name="calendar-outline"
                    size={20}
                    color="#000"
                  />
                  <Text style={styles.dateName}>
                    {formatDate(selectedDate)}
                  </Text>
                </View>
                <Text style={styles.dropdownIcon}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Payment Type Section */}
            {selectedCategory !== 'Salary' &&
              selectedCategory !== 'Freelance' && (
                <View style={styles.section}>
                  <Text style={styles.paymentTypeTitle}>Payment Type</Text>
                  <View style={styles.paymentOptions}>
                    {paymentTypes.map(type => (
                      <PaymentTypeOption
                        key={type}
                        type={type}
                        isSelected={selectedPaymentType === type}
                        onSelect={() => setSelectedPaymentType(type)}
                      />
                    ))}
                  </View>
                </View>
              )}
          </ScrollView>

          {/* Date Picker */}
          {showDatePicker && (
            <>
              {Platform.OS === 'ios' && (
                <View style={styles.datePickerContainer}>
                  <View style={styles.datePickerHeader}>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      style={styles.datePickerButton}>
                      <Text style={styles.datePickerButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      style={styles.datePickerButton}>
                      <Text
                        style={[
                          styles.datePickerButtonText,
                          styles.datePickerDoneText,
                        ]}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                    style={styles.datePicker}
                  />
                </View>
              )}
              {Platform.OS === 'android' && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </>
          )}

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                resetForm();
                onClose();
              }}
              activeOpacity={0.7}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAdd}
              activeOpacity={0.8}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    padding: 0,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  dropdownIcon: {
    fontSize: 18,
    color: '#666666',
    transform: [{rotate: '90deg'}],
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  dateName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  datePickerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 20,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  datePickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  datePickerDoneText: {
    fontWeight: '600',
  },
  datePicker: {
    backgroundColor: '#FFFFFF',
  },
  paymentTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  paymentOptions: {
    gap: 12,
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
    gap: 12,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#f00',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#b7daae',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default AddTransactionModal;
