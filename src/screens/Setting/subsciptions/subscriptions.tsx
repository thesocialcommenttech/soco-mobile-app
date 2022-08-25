import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import { Black, Blue, Yellow } from '~/src/utils/colors';
import Button from '~/src/components/theme/Button';
import { getUserProfileData } from '~/src/utils/services/user-profile_service/getUserProfileData.service';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import dayjs from 'dayjs';
import Skeleton from '~/src/components/theme/Skeleton';
import { getUserSubscriptionsHistory } from '~/src/utils/services/subscriptions_services/getUserSubscriptionHistory.service';
import {
  GetUserSubscriptionHistoryResponse,
  SubscriptionHistory
} from '~/src/utils/typings/subscriptions_interfaces/getUserSubscriptionHistory.interface';

function ReferredUsers() {
  const [loading, setLoading] = useState(true);

  const [paymentHistory, setPaymentHistory] =
    useState<GetUserSubscriptionHistoryResponse['subscriptions']>();

  async function getData() {
    setLoading(true);
    const result = await getUserSubscriptionsHistory();

    if (result.data.success) {
      setPaymentHistory(result.data.subscriptions);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SectionHeader label="Subscriptions history" style={styles.subsview} />
      {loading ? (
        <SubscriptionSkeleton />
      ) : (
        <FlatList
          data={paymentHistory}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <SubscriptionItem data={item} />}
        />
      )}
    </>
  );
}

function SubscriptionSkeleton() {
  return (
    <>
      <Skeleton
        height={40}
        style={{ marginBottom: styles.subscriptionItem.marginBottom }}
      />
      <Skeleton height={40} />
    </>
  );
}

function SubscriptionMessage(props: { timestmap: string | Date }) {
  return (
    <View style={styles.message}>
      <MaterialCommunityIcons
        name="information-outline"
        size={24}
        color="black"
        style={styles.exclamationmark}
      />

      <Text style={styles.activesub}>
        You have an active premium subscription till
        <Text style={styles.activesubtext}>
          {' '}
          {dayjs(props.timestmap).format('D MMM YYYY, h:mm A')}
        </Text>
      </Text>
    </View>
  );
}

function NoSubscriptionMessage() {
  return (
    <View style={styles.mainmessage}>
      <MaterialCommunityIcons
        name="information-outline"
        size={24}
        color="black"
        style={styles.exclamationmark}
      />

      <View style={styles.subtext}>
        <Text style={styles.activesubtext}>
          You have no active premium subscription
        </Text>
      </View>
    </View>
  );
}

function SubscriptionItem({
  data
}: {
  data: SubscriptionHistory;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
  return (
    <View style={styles.subscriptionItem}>
      <View>
        <Text style={styles.subscriptionTitle}>
          Social Comment Premium Subscription
        </Text>
        <Text style={styles.subscriptionSubTitle}>
          ₹{data.amount_paid}/- @{' '}
          {dayjs(data.timestamp).format('D MMM YYYY, h:mm A')}
        </Text>
      </View>
      <Button size="sm" onPress={() => {}} btnStyle={styles.invoiceDownloadBtn}>
        <MaterialCommunityIcons
          name="download-outline"
          size={24}
          color={Blue.primary}
        />
      </Button>
    </View>
  );
}

export default function SettingSubscriptionsScreen() {
  const [loading, setLoading] = useState(true);

  const [userPremiumData, setUserPremiumData] =
    useState<Pick<User, 'premium' | 'premium_validity_timestamp'>>();

  async function getData() {
    setLoading(true);
    const result = await getUserProfileData<
      'premium' | 'premium_validity_timestamp'
    >('premium premium_validity_timestamp');

    if (result.data.success) {
      setUserPremiumData(result.data.userData);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SettingScreenHeader title="Subscriptions" />
      <View style={styles.container}>
        {loading ? (
          <Skeleton height={70} />
        ) : userPremiumData.premium ? (
          <SubscriptionMessage
            timestmap={userPremiumData.premium_validity_timestamp}
          />
        ) : (
          <NoSubscriptionMessage />
        )}
        <ReferredUsers />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  mainmessage: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: Black[200],
    borderRadius: 8,
    alignItems: 'center'
  },
  subtext: {},
  exclamationmark: {
    marginRight: 10
  },
  subsview: {
    marginTop: 30,
    marginBottom: 20
  },
  subscriptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center'
  },
  invoiceDownloadBtn: {
    // padding: 5
  },
  message: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: Yellow[100],
    borderRadius: 8,
    alignItems: 'center'
  },
  activesub: {
    fontSize: 14,
    color: 'black',
    flexShrink: 1,
    lineHeight: 20
  },
  activesubtext: {
    color: 'black',
    fontWeight: '700'
  },
  subscriptionTitle: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  subscriptionSubTitle: {
    color: Black[600],
    marginTop: 3
  }
});
