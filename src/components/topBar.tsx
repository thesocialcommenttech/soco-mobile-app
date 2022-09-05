import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View
} from 'react-native';
import React, { useEffect } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSideMenuState } from './SideMenu';
import { Black, Colors } from '../utils/colors';
import { getUserData2 } from '../utils/services/user-profile_service/getUserData2.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../store/reducers';
import { staticFileSrc } from '../utils/methods';
import create from 'zustand';
import Logo from '~/src/assets/images/logos/thesocialcomment-logo.png';
import Textlogo from '~/src/assets/images/logos/soco-premium.png';
import { omit } from 'lodash';
interface ITopBarState {
  premium: boolean;
  setPremium: (premium: boolean) => void;
}

export const useTopBarState = create<ITopBarState>()(set => ({
  premium: undefined,
  setPremium: premium => set({ premium })
}));

function TopBar(props: { navigation: any }) {
  const auth = useSelector((root: IRootReducer) => root.auth);
  const { premium, setPremium } = useTopBarState();
  const { setOpen } = useSideMenuState();

  async function fetchUserData() {
    try {
      const result = await getUserData2(auth.user.username, 'premium');

      if (result.data.success) {
        setPremium(result.data.user.premium);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (typeof premium !== 'boolean') {
      fetchUserData();
    }
  }, []);

  return (
    <View style={styles.container}>
      {premium ? (
        <Image style={styles.textLogo} source={Textlogo} />
      ) : (
        <Image style={styles.logo} source={Logo} />
      )}
      <View style={styles.rightContainer}>
        <TopBarRightButton
          onPress={() => {
            props.navigation.navigate('Search');
          }}
        >
          <MaterialCommunityIcon name="magnify" size={22} color="white" />
        </TopBarRightButton>
        <TopBarRightButton
          onPress={() => {
            props.navigation.navigate('Notifications');
          }}
        >
          <MaterialCommunityIcon name="bell-outline" size={22} color="white" />
        </TopBarRightButton>

        <TopBarRightButton onPress={() => setOpen(true)}>
          <Image
            style={styles.profileImage}
            source={{ uri: staticFileSrc(auth.user?.profileImage) }}
          />
        </TopBarRightButton>
      </View>
    </View>
  );
}

export default TopBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 60,
    flexDirection: 'row',
    backgroundColor: Black[900],
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  logo: {
    marginLeft: 15,
    width: 30,
    resizeMode: 'contain'
  },
  textLogo: {
    marginLeft: 8,
    width: 130,
    resizeMode: 'contain'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%'
    // marginRight: '2%'
  },
  profileImageBtn: {
    backgroundColor: Black.primary,
    padding: 5,
    borderRadius: 5
  },
  profileImage: {
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'white'
  },
  closeBtn: {
    textAlign: 'right',
    color: Colors.Secondary
  }
});

function TopBarRightButton(props: TouchableHighlightProps) {
  return (
    <TouchableHighlight
      underlayColor={Black[800]}
      {...omit(props, 'style', 'children')}
      style={[styles.profileImageBtn, props.style]}
    >
      {props.children}
    </TouchableHighlight>
  );
}
