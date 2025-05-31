import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const PaymentTypeOption: React.FC<{
  type: string;
  isSelected: boolean;
  onSelect: () => void;
}> = ({type, isSelected, onSelect}) => (
  <TouchableOpacity
    style={[styles.paymentOption, isSelected && styles.selectedPaymentOption]}
    onPress={onSelect}
    activeOpacity={0.7}>
    <View style={styles.radioButton}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
    <Text
      style={[styles.paymentText, isSelected && styles.selectedPaymentText]}>
      {type}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  paymentOptions: {
    gap: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentOption: {
    borderColor: '#b7daae',
    backgroundColor: '#F0FFF0',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#b7daae',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  selectedPaymentText: {
    color: '#1A1A1A',
  },
});

export default PaymentTypeOption;
