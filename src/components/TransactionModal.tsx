import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {formatDate, generatePastelColor} from '../utils/helperFunctions';
import {getEmoji} from '../utils/getEmoji';

const {width, height} = Dimensions.get('window');

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

interface TransactionModalProps {
  visible: boolean;
  transaction: Expense | null;
  onClose?: () => void;
  onContinue?: () => void;
  onViewDetails?: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  visible,
  transaction,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                  {transaction?.id && (
                    <View
                      style={{
                        ...styles.iconCircle,
                        backgroundColor: generatePastelColor(
                          parseInt(transaction.id, 10),
                        ),
                      }}>
                      {getEmoji(transaction.category)}
                    </View>
                  )}
                </View>

                {/* Success Message */}
                <Text style={styles.successTitle}>
                  {transaction?.category === 'Salary' ||
                  transaction?.category === 'Freelance'
                    ? 'Payment Received'
                    : 'Payment Sent'}
                </Text>
                <Text style={styles.successSubtitle}>
                  Your transaction has been completed successfully
                </Text>

                {/* Amount Display */}
                <View style={styles.amountContainer}>
                  <Text style={styles.amountLabel}>
                    {transaction?.category === 'Salary' ||
                    transaction?.category === 'Freelance'
                      ? 'Received'
                      : 'Sent'}
                  </Text>
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      ...styles.amount,
                      color:
                        transaction?.category === 'Salary' ||
                        transaction?.category === 'Freelance'
                          ? '#4CAF50'
                          : '#FF6B6B',
                    }}>
                    ${transaction?.amount.toLocaleString()}
                  </Text>
                </View>

                {/* Transaction Details */}
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>
                      {formatDate(transaction?.date || '')}
                    </Text>
                  </View>
                  <View style={[styles.detailRow, styles.lastDetailRow]}>
                    <Text style={styles.detailLabel}>Payment Method</Text>
                    <Text style={styles.detailValue}>
                      {transaction?.paymentType}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={onClose}
                    activeOpacity={0.8}>
                    <Text style={styles.primaryButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    maxHeight: height * 0.8,
    width: width - 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
    marginTop: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  amountLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  amount: {
    fontSize: 36,
    fontWeight: '800',
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666666',
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#f00',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default TransactionModal;
