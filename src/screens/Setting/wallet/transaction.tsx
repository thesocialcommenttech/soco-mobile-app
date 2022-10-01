import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TransactionItem from '~/src/components/settingsComponents/TransactionItem';
import { getWalletTransactions } from '~/src/utils/services/wallet_services/getWallet.service';
import { GetWalletTransactionsResponse } from '~/src/utils/typings/wallet_interfaces/getWallet.interface';
import Loading from '~/src/components/theme/Loading';

export default function Transaction() {
  const [transactions, setTransactions] =
    useState<GetWalletTransactionsResponse['transactions']>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await getWalletTransactions();
    if (result.data.success) {
      setTransactions(result.data.transactions);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item._id}
          // ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10
  }
});
