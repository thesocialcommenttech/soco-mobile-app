import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import { Black, Blue } from '../../../utils/colors';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import { changeNotificationSettings } from '~/src/utils/services/notification_services/changeNotificationSettings.service';
import { ChangeNotificationSettingsRequest } from '~/src/utils/typings/notifications_interface/changeNotificationSettings.interface';
import { getUserProfileData } from '~/src/utils/services/user-profile_service/getUserProfileData.service';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';

export default function Notification() {
  const [loading, setLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] =
    useState<User['notification']>();

  async function fetchNotificationSettings() {
    setLoading(true);
    const result = await getUserProfileData<'notification'>('notification');

    if (result.data.success) {
      setNotificationSettings(result.data.userData.notification);
    }

    setLoading(false);
  }

  async function updateNotificationSettings(
    key: keyof ChangeNotificationSettingsRequest,
    value: boolean
  ) {
    setNotificationSettings({ ...notificationSettings, [key]: value });
    await changeNotificationSettings({ [key]: value });
  }

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  return (
    <>
      {/* <SettingScreenHeader title="Notifications" /> */}
      <View style={styles.container}>
        <View style={styles.notif}>
          <View style={styles.notifHeader}>
            <Text style={styles.notifTitle}>Newsletter</Text>
            <Text style={styles.notifDesc}>
              Receive newsletters sent periodically containing best suggested
              post for you
            </Text>
          </View>
          <View style={styles.notifActionCt}>
            <ToggleSwitch
              icon={
                loading && <ActivityIndicator color={Black[500]} size={14} />
              }
              disabled={loading}
              isOn={notificationSettings?.newsletter ?? false}
              size="medium"
              onToggle={() =>
                updateNotificationSettings(
                  'newsletter',
                  !notificationSettings?.newsletter
                )
              }
              trackOffStyle={[
                styles.offtrack,
                loading && { backgroundColor: Black[100] }
              ]}
              trackOnStyle={[styles.ontrack]}
              thumbOffStyle={[
                styles.thumboff,
                loading && { backgroundColor: Black[100] }
              ]}
              thumbOnStyle={[styles.thumbon]}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    marginTop: 10
  },
  notifHeader: { marginRight: 10, flexGrow: 1 },
  notifActionCt: {
    marginTop: 5
  },
  notifTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto-Medium'
    // lineHeight: 30
  },
  notifDesc: {
    lineHeight: 18,
    fontSize: 14,
    marginTop: 5,
    color: Black[600]
  },
  offtrack: {
    backgroundColor: Black[200]
  },
  ontrack: {
    backgroundColor: Black[200]
  },
  thumbon: {
    backgroundColor: Blue.primary,
    elevation: 10
  },
  thumboff: {
    backgroundColor: Black[600]
  },
  notif: {
    // marginTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  row: {
    flexDirection: 'row'
  },
  mheader: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600',
    marginTop: '0.5%'
  }
});
