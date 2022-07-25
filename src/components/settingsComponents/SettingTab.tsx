import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

export default function SettingTab({
  name,
  icon
}: {
  icon: string;
  name: string;
}) {
  const navigation = useNavigation();
  let ic;
  if (icon === 'user') {
    ic = <Icon1 name="user" size={30} color={'black'} />;
  } else if (icon === 'key-variant') {
    ic = <Icon name="key-variant" size={26} color={'black'} />;
  } else if (icon === 'heart-outline') {
    ic = <Icon name="heart-outline" size={26} color={'black'} />;
  } else if (icon === 'wallet-giftcard') {
    ic = <Icon name="wallet-giftcard" size={26} color={'black'} />;
  } else if (icon === 'bell-outline') {
    ic = <Icon name="bell-outline" size={26} color={'black'} />;
  } else if (icon === 'wallet-outline') {
    ic = <Icon name="wallet-outline" size={26} color={'black'} />;
  } else if (icon === 'rupee') {
    ic = <Icon2 name="rupee" size={25} color={'black'} />;
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({ name } as never, {} as never);
          }}
        >
          <View style={styles.information}>
            <View style={styles.more}>
              <View style={styles.icon}>
                {/* {icon === 'wallet-outline'
                  ? [<Icon1 name={icon} size={23} color="black" />]
                  : [<Icon name={icon} size={23} color="black" />]} */}
                {ic}
              </View>
              <View style={styles.name}>
                <Text style={styles.nametext}>{name}</Text>
              </View>
            </View>
            <View style={styles.rightIcon}>
              <Icon name="chevron-right" size={21} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.bottomruler} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '1%'
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6
  },
  more: {
    flexDirection: 'row',
    flex: 0.4
  },
  name: {
    alignSelf: 'center',
    justifyContent: 'flex-start'
  },
  nametext: {
    color: 'black'
  },
  bottomruler: {
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1.5
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
    width: '35%'
  },
  rightIcon: {
    justifyContent: 'center'
  }
});
