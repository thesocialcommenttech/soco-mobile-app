import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WithdrawAccount from '../../../components/settingsComponents/WithdrawAccount';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Black, Blue, Green } from '~/src/utils/colors';
import Button from '~/src/components/theme/Button';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import { Input } from '~/src/components/theme/Input';
import WithdrawIconImage from '../../../assets/images/icons/withdraw.png';
import {
  getWallet,
  withdrawFromWallet
} from '~/src/utils/services/wallet_services/getWallet.service';
import Skeleton from '~/src/components/theme/Skeleton';
import KycScreen from './kyc';
import { Wallet_ScreenProps } from '~/src/types/navigation/wallet';
import { useWallet } from '~/src/state/walletScreenState';
import { useFormik } from 'formik';
import { number, object } from 'yup';
import produce from 'immer';
import Toast from 'react-native-toast-message';

export default function WalletMain() {
  const navigation =
    useNavigation<Wallet_ScreenProps<'Wallet'>['navigation']>();

  const { setWallet, wallet } = useWallet();

  const [loading, setLoading] = useState(true);

  const onDefaultAccUpdate = (index: number) => {
    setWallet(
      produce(wallet, draft => {
        const prevDefaultIndex = draft.withdraw_destinations.findIndex(
          acc => acc.default
        );

        draft.withdraw_destinations[prevDefaultIndex].default = false;
        draft.withdraw_destinations[index].default = true;
      })
    );
  };
  const onAccDeleted = (index: number) => {
    setWallet(
      produce(wallet, draft => {
        draft.withdraw_destinations.splice(index, 1);
      })
    );
  };

  const withdrawFrom = useFormik({
    initialValues: { amount: null },
    validationSchema: object({
      amount: number()
        .nullable()
        .min(1000, 'Cannot withdraw less than ₹1000')
        .required('Amount is required')
    }),
    onSubmit: async values => {
      try {
        const result = await withdrawFromWallet(values.amount);
        if (result.data.success) {
          withdrawFrom.resetForm();
          if (result.data.status === 'processed') {
            Toast.show({
              visibilityTime: 10000,
              text1: 'Your transaction is processing',
              props: {
                actionRight: {
                  onPress: () => {
                    navigation.navigate('WalletTransactions');
                  },
                  text: 'Transactions'
                }
              }
            });
          } else {
            Toast.show({ text1: 'Your transaction completed successfully.' });
          }
          setWallet(
            produce(wallet, draft => {
              draft.wallet.balance = result.data.closing_balance;
            })
          );
        }
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error occurred' });
      }
    }
  });

  async function getData() {
    setLoading(true);
    const result = await getWallet();

    if (result.data.success) {
      setWallet({
        wallet: result.data.wallet,
        withdraw_destinations: result.data.withdraw_destinations,
        kyc: result.data.kyc
      });
    }
    setLoading(false);
  }

  useFocusEffect(() => {
    navigation.setOptions({
      title: !loading && !wallet.kyc ? 'Update KYC' : 'Wallet'
    });
  });

  useEffect(() => {
    getData();
    return () => {
      useWallet.destroy();
    };
  }, []);

  if (!loading && !wallet.kyc) {
    return <KycScreen />;
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <>
        <View style={styles.walletBalanceCt}>
          <View style={styles.walletPlaceholderCt}>
            <MaterialCommunityIcons
              name="wallet-outline"
              size={20}
              color={Blue.primary}
            />
            <Text style={styles.walletPlaceholder}>Wallet Balance</Text>
          </View>
          {loading ? (
            <Skeleton width={50} height={16} />
          ) : (
            <Text style={styles.balanceAmount}>₹ {wallet.wallet.balance}</Text>
          )}
        </View>
        <View style={styles.viewtran}>
          <Button
            size="sm"
            text="View transaction"
            onPress={() => {
              navigation.navigate('WalletTransactions');
            }}
          />
          {loading ? (
            <Skeleton width={50} height={25} />
          ) : (
            <View style={styles.kycCheckTag}>
              <MaterialCommunityIcons
                name="account-check-outline"
                size={22}
                color={Green.primary}
              />
              <Text style={styles.kycText}>KYC</Text>
            </View>
          )}
        </View>
        <View style={styles.withdrawCt}>
          <SectionHeader label="Withdraw" style={styles.widthdrawHeader} />
          <Input
            label="Amount"
            prefix={
              <MaterialCommunityIcons
                name="currency-inr"
                size={18}
                color="black"
              />
            }
            inputContainer={styles.withdrawInputCt}
            inputProp={{
              placeholder: 'Eg. 100',
              value: withdrawFrom.values.amount,
              onChangeText: withdrawFrom.handleChange('amount'),
              style: styles.withdrawInput,
              editable: !loading || withdrawFrom.isSubmitting,
              keyboardType: 'number-pad'
            }}
            error={
              withdrawFrom.touched.amount &&
              (withdrawFrom.errors.amount as string)
            }
          />
          <Button
            size="sm"
            fullWidth
            type="filled"
            onPress={withdrawFrom.handleSubmit}
            disabled={loading || withdrawFrom.isSubmitting}
            processing={withdrawFrom.isSubmitting}
            btnStyle={styles.withdrawBtn}
          >
            <View style={styles.withTextCt}>
              <Image
                source={WithdrawIconImage}
                style={{ marginVertical: -5 }}
              />
              <Text style={styles.withdrawText}>Withdraw</Text>
            </View>
          </Button>
        </View>

        <View style={styles.account}>
          <SectionHeader label="Your Accounts" style={styles.accountHeader}>
            <Button
              btnStyle={styles.addAccBtn}
              onPress={() => navigation.navigate('AddAccount')}
            >
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={24}
                color={Black[600]}
              />
            </Button>
          </SectionHeader>
        </View>
        {loading ? (
          <Skeleton height={56} />
        ) : (
          <FlatList
            data={wallet.withdraw_destinations}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => (
              <WithdrawAccount
                account={item}
                style={{ marginBottom: 20 }}
                onDefaultSet={() => onDefaultAccUpdate(index)}
                onDelete={() => onAccDeleted(index)}
              />
            )}
          />
        )}
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10
  },
  walletBalanceCt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Blue[50]
  },
  withdrawInputCt: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2
  },
  withdrawInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 10
  },
  walletPlaceholderCt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  walletPlaceholder: {
    marginLeft: 10,
    color: Blue.primary
  },
  balanceAmount: {
    color: 'black',
    fontFamily: 'Roboto-Medium'
  },
  viewtran: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center'
  },
  kycCheckTag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  kycText: {
    color: Green.primary,
    marginLeft: 5
  },
  withdrawCt: {
    marginTop: 30
  },
  widthdrawHeader: { marginBottom: 20 },
  passTB: {},
  eye: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  withdrawBtn: {
    marginTop: 20,
    backgroundColor: Green.primary
  },
  withTextCt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10
  },
  withdrawText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginLeft: 10
  },
  account: {
    marginTop: 30
  },
  accountHeader: {
    marginBottom: 20,
    alignItems: 'center'
  },
  addAccBtn: { padding: 5, borderRadius: 20 }
});
