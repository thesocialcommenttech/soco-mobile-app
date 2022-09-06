import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Easing
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import create from 'zustand';
import { useNavigation } from '@react-navigation/native';
import { AuthActionTypes, setAuthToLogout } from '~/src/store/actions/auth';
import { IRootReducer } from '~/src/store/reducers';
import { Black, Colors } from '~/src/utils/colors';
import { staticFileSrc } from '~/src/utils/methods';
import { getUserData2 } from '~/src/utils/services/user-profile_service/getUserData2.service';
import { getUserProfileCompletion } from '~/src/utils/services/user-profile_service/getUserProfileCompletion.service';
import CircularProgress from './circularIndicator';
import Button from './theme/Button';
import { App_ScreenProps } from '../types/navigation/app';

interface ISideMenuState {
  open: boolean;
  visible: boolean;
  setOpen: (open: boolean) => void;
  setVisible: (visible: boolean) => void;
}

export const useSideMenuState = create<ISideMenuState>()(set => ({
  open: false,
  visible: false,
  setOpen: (open: boolean) => set({ open }),
  setVisible: (visible: boolean) => set({ visible })
}));

type ISideMenuItem =
  | { component: typeof SideMenuItem; props: ISideMenuItemProps }
  | { component: typeof MenuItemDivider; props: null };

interface ISideMenuItemProps {
  label: string;
  subLabel: string;
  navigateTo: Function;
  icon: string;
  isNew: boolean;
}

function SideMenuItem(props: ISideMenuItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => props.navigateTo?.()}>
      {/* {props.label !== 'Settings' && (
        )} */}
      <MaterialCommunityIcon
        name={props.icon}
        size={22}
        color={Black.primary}
      />
      {/* {props.label === 'Settings' && (
        <Ionicon name={props.icon} size={22} color={Colors.Black} />
      )} */}
      <View
        style={[
          styles.itemTextContainer1,
          props.subLabel && styles.itemTextContainer2
        ]}
      >
        <Text style={styles.buttonText}>{props.label}</Text>
        {props.isNew && (
          <View style={styles.newView}>
            <Text style={styles.newText}>New</Text>
          </View>
        )}
        {props.subLabel && (
          <Text style={styles.subLabel}>{props.subLabel}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

function SideMenu() {
  const { open, setVisible, visible, setOpen } = useSideMenuState();
  const auth = useSelector((state: IRootReducer) => state.auth);

  const [profileCompletion, setProfileCompletion] = useState(0);
  const [premium, setPremium] = useState(false);

  const translateX = useRef(
    new Animated.Value(Dimensions.get('window').width * 0.8)
  ).current;

  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  const navigation = useNavigation<App_ScreenProps['navigation']>();

  const onItemPress =
    (...args) =>
    () => {
      setOpen(false);
      navigation.push(...(args as any));
    };

  const toggleDropdown = () => {
    if (open) {
      setVisible(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 210,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
          // delay: 10
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
          // delay: 10
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: Dimensions.get('window').width * 0.8,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 210,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
          // delay: 10
        })
      ]).start(() => {
        setVisible(false);
      });
    }
  };

  async function fetchProfileCompletion() {
    const result = await getUserProfileCompletion();
    if (result.data.success) {
      let completedSteps = Object.values(result.data.completed_profile.work);
      delete result.data.completed_profile.work;

      completedSteps = completedSteps.concat(
        Object.values(result.data.completed_profile)
      );

      let countCompletedSteps = completedSteps.reduce<number>(
        (p, c) => (c ? p + 1 : p),
        0
      );

      setProfileCompletion((countCompletedSteps / completedSteps.length) * 100);
    }
  }

  async function fetchUserPremiumStatus() {
    const result = await getUserData2(auth.user?.username, 'premium');

    if (result.data.success) {
      setPremium(result.data.user.premium);
    }
  }

  useEffect(() => {
    toggleDropdown();
  }, [open]);

  useEffect(() => {
    fetchProfileCompletion();
    fetchUserPremiumStatus();
  }, []);

  const menuItems: ISideMenuItem[] = [
    {
      component: SideMenuItem,
      props: {
        label: 'Internships/Jobs',
        icon: 'briefcase-outline',
        subLabel: 'Coming Soon',
        isNew: false,
        navigateTo: null
      }
    },
    {
      component: SideMenuItem,
      props: {
        label: 'Virtual Desk',
        icon: 'view-stream-outline',
        subLabel: null,
        isNew: true,
        navigateTo: null
      }
    },
    { component: MenuItemDivider, props: null },
    {
      component: SideMenuItem,
      props: {
        label: 'Referral',
        icon: 'wallet-giftcard',
        subLabel: null,
        isNew: false,
        navigateTo: () => {
          setOpen(false);
          navigation.navigate('Setting', {
            screen: 'Referral'
          });
        }
      }
    },
    {
      component: SideMenuItem,
      props: {
        label: 'Wallet',
        icon: 'wallet-outline',
        subLabel: null,
        isNew: false,
        navigateTo: () => {
          setOpen(false);
          navigation.navigate('Setting', {
            screen: 'WalletStack'
          });
        }
      }
    },
    {
      component: SideMenuItem,
      props: {
        label: 'Favourites',
        icon: 'heart-outline',
        subLabel: null,
        isNew: false,
        navigateTo: null
      }
    },
    { component: MenuItemDivider, props: null },
    {
      component: SideMenuItem,
      props: {
        label: 'Settings',
        icon: 'cog-outline',
        subLabel: null,
        isNew: false,
        navigateTo: () => {
          setOpen(false);
          navigation.navigate('Setting');
        }
      }
    },
    {
      component: SideMenuItem,
      props: {
        label: 'Drafts',
        icon: 'inbox',
        subLabel: null,
        isNew: false,
        navigateTo: () => {
          setOpen(false);
          navigation.navigate('App', {
            screen: 'ProfileTab',
            params: { screen: 'Drafts' }
          });
        }
      }
    },
    {
      component: SideMenuItem,
      props: {
        label: 'Trash',
        icon: 'delete-outline',
        subLabel: null,
        isNew: false,
        navigateTo: () => {
          setOpen(false);
          navigation.navigate('App', {
            screen: 'ProfileTab',
            params: { screen: 'Trash' }
          });
        }
      }
    }
  ];

  return (
    <Modal transparent visible={visible}>
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <Animated.View
          style={{
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: backdropOpacity
          }}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.dropdown,
          {
            width: Dimensions.get('window').width * 0.8,
            transform: [{ translateX }]
          }
        ]}
      >
        <ScrollView contentContainerStyle={[{ flexGrow: 1 }]}>
          <Button
            size="sm"
            onPress={() => setOpen(false)}
            btnStyle={styles.closeBtn}
          >
            <MaterialCommunityIcon name="close" size={24} color={Black[600]} />
          </Button>
          <View style={{ flexGrow: 1 }}>
            <View style={styles.picInfo}>
              <CircularProgress
                percent={profileCompletion}
                title={auth.user?.username}
                uri={staticFileSrc(auth.user?.profileImage)}
                clockwise={false}
              />
              <Text style={styles.name}>{auth.user?.name}</Text>
              {premium && (
                <View style={styles.premium}>
                  <Text style={styles.premiumText}>Premium Account</Text>
                </View>
              )}
            </View>
            <MenuItemDivider />
            {menuItems.map((item, i) => (
              <item.component {...item.props} key={i} />
            ))}
            {/* <View style={styles.horizontalLine} />
            {data2.map((item, i) => (
              <SideMenuItem key={i + item.label} {...item} />
            ))} */}
          </View>
          <MenuItemDivider />
          <Button
            type="filled"
            fullWidth
            btnStyle={{ borderRadius: 0 }}
            onPress={() => {
              // setVisible(false);
              dispatch(setAuthToLogout());
            }}
          >
            {() => (
              <View style={styles.logoutBtn}>
                <MaterialCommunityIcon name="logout" size={20} color="white" />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            )}
          </Button>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'black'
    // fontSize: 14
  },
  dropdown: {
    // position: 'absolute',
    // top: '-3%',
    // right: '-5%',
    // zIndex: 999,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    width: 250,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    height: '100%',
    overflow: 'hidden',
    elevation: 10
    // borderRadius: 12,
    // top: '-1%',
    // right: '-1%'
  },
  item: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  picInfo: {
    alignItems: 'center',
    marginTop: 20
  },
  closeBtn: {
    // color: Colors.Secondary,
    position: 'absolute',
    right: 10,
    top: 10
    // marginTop: '4%',
    // marginRight: '4%',
    // alignSelf: 'flex-end'
  },
  avatar2: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 7,
    borderStartColor: Colors.Secondary,
    borderEndColor: Colors.Secondary,
    borderBottomColor: Colors.Secondary,
    borderTopColor: Colors.Secondary
  },
  avatar: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'white'
  },
  avatarTitle: {
    color: 'white',
    textTransform: 'uppercase'
  },
  name: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
    color: Colors.Black
  },
  premium: {
    backgroundColor: Colors.Primary,
    borderRadius: 19,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 10
  },
  premiumText: {
    color: 'black',
    fontSize: 11
  },
  horizontalLine: {
    borderBottomColor: Colors.GrayLine,
    borderBottomWidth: 1,
    marginTop: '5%',
    marginBottom: '5%'
  },
  newView: {
    backgroundColor: Colors.Secondary,
    borderRadius: 19,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: '5%'
  },
  newText: {
    color: 'white',
    fontSize: 11
  },
  itemTextContainer1: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  itemTextContainer2: {
    // paddingLeft: 10
    // flex: 1
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  subLabel: {
    fontSize: 12,
    color: Colors.Secondary
    // marginTop: 2
  },
  logoutBtn: {
    flexDirection: 'row'
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: '5%',
    // backgroundColor: Colors.Secondary,
    // // marginBottom: '5%',
    // marginHorizontal: '5%',
    // borderRadius: 12
  },
  logoutText: {
    // fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    marginLeft: 10
  }
});

export default SideMenu;

function MenuItemDivider() {
  return <View style={styles.horizontalLine} />;
}
