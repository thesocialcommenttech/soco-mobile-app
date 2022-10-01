import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ScrollView
} from 'react-native';
import ReferredUser, {
  ReferredUserSkeleton
} from '../../../components/settingsComponents/ReferredUser';
import Clipboard from '@react-native-clipboard/clipboard';
import { Black, Blue, Colors } from '../../../utils/colors';
import { getUserReferralData } from '~/src/utils/services/user-referral-data_service/getUserReferralData.service';
import { GetUserReferralDataResponse } from '~/src/utils/typings/user-referral-data_interface/getUserReferralData.interface';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import { getUserReferredUsers } from '~/src/utils/services/user-referral-data_service/getUserReferredUsers.service';
import { GetUserReferredUsersResponse } from '~/src/utils/typings/user-referral-data_interface/getUserReferredUsers.interface';
import Skeleton from '~/src/components/theme/Skeleton';

export default function Referals() {
  const [code] = useState('5UYRCH');
  const [data, setData] =
    useState<Pick<GetUserReferralDataResponse, 'referal' | 'referalCode'>>();
  const [referredUsers, setReferredUsers] =
    useState<GetUserReferredUsersResponse['referred_users']>();
  const [loading, setLoading] = useState(true);
  const [referredUserLoading, setReferredUserLoading] = useState(true);

  function copyToClipboard(text) {
    Clipboard.setString(text);
  }

  const showToast = () => {
    ToastAndroid.show('Code copied to Clipboard', ToastAndroid.SHORT);
  };

  async function fetchReferredUsers() {
    setReferredUserLoading(true);
    const result = await getUserReferredUsers();

    if (result.data.success) {
      setReferredUsers(
        result.data.referred_users.filter(reference => reference.user)
      );
    }
    setReferredUserLoading(false);
  }

  async function getData() {
    setLoading(true);
    const result = await getUserReferralData();

    if (result.data.success) {
      setData({
        referal: result.data.referal,
        referalCode: result.data.referalCode
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
    fetchReferredUsers();
  }, []);

  return (
    <>
      {/* <SettingScreenHeader title="Refferals" /> */}
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <Skeleton height={85} />
          ) : (
            <>
              <View style={styles.box}>
                <Text style={styles.heading}>Your Refferal Code</Text>
                <TouchableOpacity
                  style={styles.codebox}
                  onPress={() => {
                    copyToClipboard(code);
                    showToast();
                  }}
                >
                  <Text style={styles.code}>{data?.referalCode}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          <Text style={styles.share}>
            Share this code with your Friends.If anybody uses this code at the
            time of registration to socialcomment you will receive exciting
            incentives.
          </Text>
          {loading ? (
            <Skeleton
              height={16}
              style={{ marginTop: styles.codeused.marginTop }}
            />
          ) : (
            data?.referal && (
              <View style={styles.codeused}>
                <Text style={styles.instruction}>Refferal Code used </Text>
                <Text style={styles.Code}>{data?.referal}</Text>
              </View>
            )
          )}

          <SectionHeader
            label="Your Refferals"
            style={{ marginTop: 30, marginBottom: 10 }}
          />
          {loading ? (
            <>
              <ReferredUserSkeleton />
              <ReferredUserSkeleton style={{ marginTop: 10 }} />
            </>
          ) : (
            <FlatList
              data={referredUsers}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <ReferredUser
                  style={{ marginHorizontal: -20, paddingHorizontal: 20 }}
                  user={item.user}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10
  },
  box: {
    borderWidth: 1,
    borderColor: Blue.primary,
    borderRadius: 10,
    marginTop: 6
  },
  heading: {
    color: 'black',
    fontSize: 14,
    top: -11,
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  codebox: {
    padding: 20
  },
  code: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    letterSpacing: 3,
    textAlign: 'center'
  },
  share: {
    marginTop: 20,
    color: Black[600],
    fontSize: 16,
    lineHeight: 20
  },
  codeused: {
    marginTop: 10,
    flexDirection: 'row'
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: 17,
    marginTop: '2%',
    marginBottom: '2%',
    color: '#7D7987'
  },
  refferals: {
    marginTop: '7%',
    marginLeft: '2.5%'
  },
  bottomruler: {
    borderBottomColor: Colors.BottomRulerColor,
    borderBottomWidth: 1,
    marginTop: '2%',
    marginLeft: '2.5%',
    marginRight: '2.5%'
  },
  instruction: {
    color: Black[600],
    fontSize: 16
  },
  Code: {
    color: Blue.primary
  }
});
