import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Black, Colors } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { getNotifications } from '../../utils/services/notification_services/getNotifications.service';
import {
  GetNotificatiosnresponse,
  Notification
} from '~/src/utils/typings/notifications_interface/getNotifications.interface';
import { format } from 'timeago.js';
import { ActivityIndicator } from 'react-native-paper';
import { markNotificationsAsRead } from '~/src/utils/services/notification_services/markNotificationsAsRead.service';
import { Link, useFocusEffect, useNavigation } from '@react-navigation/native';
import { App_ScreenProps } from '~/src/types/navigation/app';
import { navigatePostScreen } from '~/src/utils/methods';
import { MainStackScreenProps } from '~/src/types/navigation/main';
import { PostType } from '~/src/utils/typings/post';

function NotificationItem({
  notification
}: {
  notification: Notification;
}): ReactElement {
  return (
    <View style={styles.notification}>
      <View style={styles.notificationTime}>
        <Text style={styles.notificationTimeText}>
          {format(notification.notifiedOn)}
        </Text>
      </View>
      {(() => {
        switch (notification.type) {
          case 'add-fav':
            return (
              <View style={styles.notificationTitle}>
                <Text style={styles.notificationUserText}>
                  <UsernameLink
                    user_id={notification.data.userID._id}
                    username={notification.data.userID.username}
                  />
                  <Text style={styles.notificationText}>
                    {' '}
                    make {notification.data.postID.postType}{' '}
                    <PostLink
                      postId={notification.data.postID._id}
                      postTitle={notification.data.postID.title}
                      postType={notification.data.postID.postType}
                    />{' '}
                    as favourite.
                  </Text>
                </Text>
              </View>
            );
          case 'new-post':
            return (
              <View style={styles.notificationTitle}>
                <Text style={styles.notificationUserText}>
                  <UsernameLink
                    user_id={notification.data.userID._id}
                    username={notification.data.userID.username}
                  />
                  <Text style={styles.notificationText}>
                    {' '}
                    posted a new {notification.data.postID.postType}{' '}
                    <PostLink
                      postId={notification.data.postID._id}
                      postTitle={notification.data.postID.title}
                      postType={notification.data.postID.postType}
                    />
                  </Text>
                </Text>
              </View>
            );
          case 'add-like':
            return (
              <View style={styles.notificationTitle}>
                <Text style={styles.notificationUserText}>
                  <UsernameLink
                    user_id={notification.data.userID._id}
                    username={notification.data.userID.username}
                  />
                  <Text style={styles.notificationText}>
                    {' '}
                    liked your {notification.data.postID.postType}{' '}
                    <PostLink
                      postId={notification.data.postID._id}
                      postTitle={notification.data.postID.title}
                      postType={notification.data.postID.postType}
                    />
                  </Text>
                </Text>
              </View>
            );
          case 'new-comment':
            return (
              <View style={styles.notificationTitle}>
                <Text style={styles.notificationUserText}>
                  <UsernameLink
                    user_id={notification.data.userID._id}
                    username={notification.data.userID.username}
                  />
                  <Text style={styles.notificationText}>
                    {' '}
                    comments on your {notification.data.postID.postType}{' '}
                    <PostLink
                      postId={notification.data.postID._id}
                      postTitle={notification.data.postID.title}
                      postType={notification.data.postID.postType}
                    />
                  </Text>
                </Text>
              </View>
            );
          case 'shared-post':
            return (
              <View style={styles.notificationTitle}>
                <Text style={styles.notificationUserText}>
                  <UsernameLink
                    user_id={notification.data.userID._id}
                    username={notification.data.userID.username}
                  />
                  <Text style={styles.notificationText}>
                    {' '}
                    shared {notification.data.postID.postType}{' '}
                    <PostLink
                      postId={notification.data.postID._id}
                      postTitle={notification.data.postID.title}
                      postType={notification.data.postID.postType}
                    />{' '}
                    with you.
                  </Text>
                </Text>
              </View>
            );
          case 'admin-msg':
            return (
              <View style={styles.notificationTitle}>
                <Text style={styles.notificationText}>
                  {notification.data.message}
                </Text>
                {/* {notification.data.links?.map(link => (
                  <View>
                    {link.relativeTo === 'username' ? (
                      <TouchableOpacity
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                          paddingHorizontal: 10,
                          marginTop: 10,
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          borderRadius: 6
                        }}
                      >
                        <FontAwesome5
                          name="external-link-alt"
                          style={{ marginRight: 5 }}
                          color="gray"
                        />
                        <Text>{link.text}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text>
                        <FontAwesome5 name="external-link-alt" /> {link.text}
                      </Text>
                    )}
                  </View>
                ))} */}
              </View>
            );
        }
      })()}
    </View>
  );
}

const NotificationsScreen = ({
  navigation
}: {
  navigation: App_ScreenProps['navigation'];
}) => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] =
    useState<GetNotificatiosnresponse['notifications']>();

  const unreadNotifications = useMemo(
    () => notifications?.unread,
    [notifications]
  );

  const readNotifications = useMemo(() => notifications?.read, [notifications]);

  async function markAsRead() {
    const notifiationIds = unreadNotifications.map(
      notification => notification._id
    );

    await markNotificationsAsRead({ notifications: notifiationIds });
  }

  async function fetchNotifications() {
    setLoading(true);
    const result = await getNotifications();

    if (result.data.success) {
      setNotifications(result.data.notifications);
    }
    setLoading(false);
  }

  useFocusEffect(() => {
    navigation.setOptions({
      title: 'Notifications',
      headerShown: true,
      headerShadowVisible: false,
      headerRight: props => (
        <TouchableOpacity
          onPress={() => {
            fetchNotifications();
          }}
        >
          <MaterialCommunityIcon name="refresh" size={24} color="black" />
        </TouchableOpacity>
      )
    });
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!loading && unreadNotifications?.length > 0) {
      setTimeout(() => {
        markAsRead();
      }, 1000);
    }
  }, [unreadNotifications]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcon
            name="arrow-left"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View> */}
      {loading ? (
        <View style={styles.loadingCt}>
          <ActivityIndicator size={24} color={Colors.Secondary} />
        </View>
      ) : (
        <ScrollView>
          {unreadNotifications?.length > 0 && (
            <>
              <View style={styles.util}>
                <Text style={styles.utilText}>Unread</Text>
              </View>
              <View style={styles.unread}>
                {unreadNotifications?.map(notification => {
                  return (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                    />
                  );
                })}
              </View>
            </>
          )}
          {readNotifications?.length > 0 && (
            <>
              <View style={styles.util}>
                <Text style={styles.utilText}>Read</Text>
              </View>
              <View style={styles.read}>
                {readNotifications?.map(notification => {
                  return (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                    />
                  );
                })}
              </View>
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: '5%'
    paddingVertical: '5%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingHorizontal: 20
  },
  backIcon: {},
  title: {
    width: '100%',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
    color: '#000',
    fontFamily: 'Roboto-Medium'
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: '#000',
    flexGrow: 1,
    paddingHorizontal: 15
  },
  util: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15
  },
  utilText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    // fontWeight: '700',
    color: Black[600]
  },
  notification: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  unread: {
    // maxHeight: '50%',
    backgroundColor: '#fff7db'
  },
  read: {},
  notificationTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  notificationTimeText: {
    fontSize: 14,
    // fontFamily: 'Roboto-Medium',
    color: Black[600]
  },
  notificationTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap'
  },
  notificationUserText: {
    fontSize: 15,
    // fontFamily: 'Roboto-Medium',
    color: Colors.Secondary,
    lineHeight: 22
  },

  notificationText: {
    fontSize: 15,
    color: 'black',
    lineHeight: 20
  },
  notificationTitleText: {
    // fontSize: 14,
    color: Black[600]
  },
  loadingCt: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
});
function PostLink(props: {
  postId: string;
  postTitle: string;
  postType: string;
}) {
  const navigation = useNavigation<MainStackScreenProps['navigation']>();

  return (
    <Text
      onPress={() =>
        navigatePostScreen(navigation, props.postId, props.postType as PostType)
      }
      style={styles.notificationTitleText}
    >
      {props.postTitle}
    </Text>
  );
}

function UsernameLink(props: { user_id: string; username: string }) {
  return (
    <Link
      to={{
        screen: 'App',
        params: {
          screen: 'ProfileTab',
          params: {
            screen: 'Profile',
            params: { user_id: props.user_id, username: props.username }
          }
        }
      }}
    >
      @{props.username}
    </Link>
  );
}
