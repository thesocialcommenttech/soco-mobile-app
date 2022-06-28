import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar } from '@rneui/base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CircularProgress from './circularIndicator';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ReactNativeModal from 'react-native-modal';
import { Colors } from '../utils/colors';
import {
  AuthAction,
  AuthActionTypes,
  setAuthToLogout
} from '../store/actions/auth';
import store from '../store';
import { getAuthCredentials } from '../lib/auth-credentials';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IRootReducer } from '../store/reducers';

const RenderItem = ({
  item,
  setVisible,
  props
}: {
  item: {
    label: string;
    subLabel: string;
    value: string;
    icon: string;
    isNew: boolean;
  };
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  props: any;
}): ReactElement<any, any> => {
  const onItemPress = (
    Item: { label: string },
    navigation: { navigate: (arg0: string) => void }
  ): void => {
    setVisible(false);
    if (item.label === 'Drafts') {
      navigation.navigate('Drafts');
    }
    if (item.label === 'Trash') {
      navigation.navigate('Trash');
    }
  };
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onItemPress(item, props.label.navigation)}
    >
      {item.label !== 'Settings' && (
        <MaterialCommunityIcon
          name={item.icon}
          size={17}
          color={Colors.Black}
        />
      )}
      {item.label === 'Settings' && (
        <Ionicon name={item.icon} size={17} color={Colors.Black} />
      )}
      <View
        style={
          item.subLabel ? styles.itemTextContainer2 : styles.itemTextContainer1
        }
      >
        <Text style={styles.buttonText}>{item.label}</Text>
        {item.isNew && (
          <View style={styles.newView}>
            <Text style={styles.newText}>New</Text>
          </View>
        )}
        {item.subLabel && <Text style={styles.subLabel}>{item.subLabel}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const DropdownTopbar = props => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selected, setSelected] = useState(undefined);

  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();
  const data1 = [
    {
      label: 'Internships/Jobs',
      icon: 'briefcase-outline',
      subLabel: 'Coming Soon',
      isNew: false,
      value: '1'
    },
    {
      label: 'Virtual Desk',
      icon: 'view-stream-outline',
      subLabel: null,
      isNew: true,
      value: '2'
    },
    {
      label: 'Feeds',
      icon: 'view-stream-outline',
      subLabel: null,
      isNew: false,
      value: '3'
    }
  ];
  const data2 = [
    {
      label: 'Profile',
      icon: 'account-circle-outline',
      subLabel: null,
      isNew: false,
      value: '4'
    },
    {
      label: 'Portfolio',
      icon: 'clipboard-account-outline',
      subLabel: null,
      isNew: false,
      value: '5'
    },
    {
      label: 'Settings',
      icon: 'settings-outline',
      subLabel: null,
      isNew: false,
      value: '6'
    },
    {
      label: 'Drafts',
      icon: 'email-open',
      subLabel: null,
      isNew: false,
      value: '7'
    },
    {
      label: 'Trash',
      icon: 'delete-outline',
      subLabel: null,
      isNew: false,
      value: '8'
    }
  ];

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py);
    });
    setVisible(true);
  };

  const onSelect = (item: { label: string; value: string }) => {
    // console.log('Selected', item);
  };

  const renderItem = ({ item }): ReactElement<any, any> => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onItemPress(item, props.label.navigation)}
    >
      {item.label !== 'Settings' && (
        <Icon1 name={item.icon} size={17} color="#000" />
      )}
      {item.label === 'Settings' && (
        <Icon2 name={item.icon} size={17} color="#000" />
      )}
      <View
        style={
          item.subLabel ? styles.itemTextContainer2 : styles.itemTextContainer1
        }
      >
        <Text style={styles.buttonText}>{item.label}</Text>
        {item.isNew && (
          <View style={styles.newView}>
            <Text style={styles.newText}>New</Text>
          </View>
        )}
        {item.subLabel && <Text style={styles.subLabel}>{item.subLabel}</Text>}
      </View>
    </TouchableOpacity>
  );
  const onItemPress = (item, navigation): void => {
    // setSelected(item);
    // onSelect(item);
    setVisible(false);
    if (item.label === 'Drafts') {
      navigation.navigate('Drafts');
    }
    if (item.label === 'Trash') {
      navigation.navigate('Trash');
    }
    if (item.label === 'Settings') {
      navigation.navigate('Setting');
    }
  };

  return (
    <TouchableOpacity ref={DropdownButton} onPress={toggleDropdown}>
      <Avatar
        size={30}
        rounded
        title={props.label.username?.charAt(0)}
        titleStyle={styles.avatarTitle}
        source={{
          uri: props.label.uri
        }}
        activeOpacity={0.7}
        containerStyle={styles.avatar}
      />
      <ReactNativeModal
        style={styles.dropdown}
        isVisible={visible}
        backdropOpacity={0.5}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
      >
        <ScrollView /* style={[styles.dropdown]} */>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.closeBtn}
          >
            <MaterialCommunityIcon
              name="close"
              size={24}
              color={Colors.Secondary}
            />
          </TouchableOpacity>
          <View style={styles.picInfo}>
            <CircularProgress
              percent={props.label.percentProfile}
              title={props.label.username?.charAt(0)}
              uri={props.label.uri}
              clockwise={false}
            />
            <Text style={styles.name}>{props.label.username}</Text>
            {props.label.premium && (
              <View style={styles.premium}>
                <Text style={styles.premiumText}>Premium Account</Text>
              </View>
            )}
          </View>
          <View style={styles.horizontalLine} />
          {data1.map(item => (
            <RenderItem
              item={item}
              key={item.value}
              selected={selected}
              setSelected={setSelected}
              visible={visible}
              setVisible={setVisible}
              props={props}
            />
          ))}
          <View style={styles.horizontalLine} />
          {data2.map((item, index) => (
            <RenderItem
              key={index}
              item={item}
              selected={selected}
              setSelected={setSelected}
              visible={visible}
              setVisible={setVisible}
              props={props}
            />
          ))}
          <View style={styles.horizontalLine} />
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              // setVisible(false);
              dispatch(setAuthToLogout());
            }}
          >
            <MaterialCommunityIcon name="logout" size={24} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </ReactNativeModal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.Black,
    fontSize: 14,
    fontWeight: '400'
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: Colors.SideBarBackground,
    width: '80%',
    borderRadius: 12,
    zIndex: 999,
    height: '100%',
    top: '-3%',
    right: '-5%'
    // top: '-1%',
    // right: '-1%'
  },
  item: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  picInfo: {
    alignItems: 'center',
    marginTop: '-5%'
  },
  closeBtn: {
    color: Colors.Secondary,
    marginTop: '4%',
    marginRight: '4%',
    alignSelf: 'flex-end'
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
    color: 'white'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
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
    paddingLeft: 10
    // flex: 1
    // alignItems: 'center'
    // justifyContent: 'flex-start'
  },
  subLabel: {
    fontSize: 12,
    color: Colors.Secondary,
    marginTop: '2%'
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    backgroundColor: Colors.Secondary,
    // marginBottom: '5%',
    marginHorizontal: '5%',
    borderRadius: 12
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: '2%'
  }
});

export default DropdownTopbar;
