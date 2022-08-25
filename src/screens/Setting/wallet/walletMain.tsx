import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import WithdrawAccount from '../../../components/settingsComponents/WithdrawAccount';
import { useNavigation } from '@react-navigation/native';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import { Black, Blue, Green } from '~/src/utils/colors';
import Button from '~/src/components/theme/Button';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import { Input } from '~/src/components/theme/Input';
import WithdrawIconImage from '../../../assets/images/icons/withdraw.png';
import { getWallet } from '~/src/utils/services/wallet_services/getWallet.service';
import { GetWalletResponse } from '~/src/utils/typings/wallet_interfaces/getWallet.interface';
import {
  BankWithdrawDestData,
  UPIWithdrawDestData
} from '~/src/utils/typings/wallet_interfaces/addWithdrawAccount';
import Skeleton from '~/src/components/theme/Skeleton';
import KycScreen from './kyc';

export default function WalletMain() {
  const navigation = useNavigation();

  const [data, setData] =
    useState<
      Pick<GetWalletResponse, 'wallet' | 'withdraw_destinations' | 'kyc'>
    >();

  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    const result = await getWallet();

    if (result.data.success) {
      setData({
        wallet: result.data.wallet,
        withdraw_destinations: result.data.withdraw_destinations
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (!loading && !data.kyc) {
    return <KycScreen />;
  }

  return (
    <>
      <SettingScreenHeader title="Wallet" />
      <ScrollView style={styles.container}>
        <>
          <View style={styles.walletBalanceCt}>
            <View style={styles.walletPlaceholderCt}>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={24}
                color={Blue.primary}
              />
              <Text style={styles.walletPlaceholder}>Wallet Balance</Text>
            </View>
            {loading ? (
              <Skeleton width={50} height={16} />
            ) : (
              <Text style={styles.balanceAmount}>₹ {data.wallet.balance}</Text>
            )}
          </View>
          <View style={styles.viewtran}>
            <Button
              text="View transaction"
              onPress={() => {
                navigation.navigate('Wallet Transactions' as never);
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
                  size={20}
                  color="black"
                />
              }
              inputProp={{
                placeholder: 'Eg. 100',
                style: { paddingLeft: 10 },
                editable: loading
              }}
            />
            <Button
              onPress={() => {}}
              type="filled"
              disabled={loading}
              fullWidth={true}
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
                onPress={() => {
                  navigation.navigate('Add Account' as never, {} as never);
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  color={Black[500]}
                />
              </Button>
            </SectionHeader>
          </View>
          {loading ? (
            <Skeleton height={56} />
          ) : (
            <FlatList
              data={data.withdraw_destinations}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <WithdrawAccount
                  type={item.destination_type}
                  title={
                    item.destination_type === 'bank'
                      ? (item.detail as BankWithdrawDestData).bank_account_no
                      : (item.detail as UPIWithdrawDestData).upi_id
                  }
                  style={{ marginBottom: 20 }}
                />
              )}
            />
          )}
        </>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  walletBalanceCt: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Blue.primary,
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    // marginTop: '4%',
    // marginLeft: '4%',
    // marginRight: '4%',
    borderRadius: 8
  },
  walletPlaceholderCt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  walletPlaceholder: {
    marginLeft: 10,
    fontSize: 16,
    color: Blue.primary,
    fontFamily: 'Roboto-Medium'
  },
  balanceAmount: {
    fontSize: 16,
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
