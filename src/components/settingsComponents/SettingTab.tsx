import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';

export default function SettingTab({
  label,
  icon,
  screenKey
}: {
  icon: string;
  label: string;
  screenKey: string;
}) {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={Black[100]}
      style={styles.container}
      onPress={() => {
        navigation.navigate({ name: screenKey } as never, {} as never);
      }}
    >
      <View style={styles.information}>
        <View style={styles.more}>
          <View style={styles.icon}>
            {/* {icon === 'wallet-outline'
                  ? [<Icon1 name={icon} size={23} color="black" />]
                  : [<Icon name={icon} size={23} color="black" />]} */}
            <MaterialCommunityIcons name={icon} size={24} color={'black'} />
          </View>
          <View style={styles.name}>
            <Text style={styles.nametext}>{label}</Text>
          </View>
        </View>
        {/* <View style={styles.rightIcon}>
              <Icon name="chevron-right" size={21} />
            </View> */}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Black[100]
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    // padding: 6
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
    color: 'black',
    fontSize: 16
  },
  bottomruler: {
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1.5
  },
  icon: {
    marginRight: 15
  },
  rightIcon: {
    justifyContent: 'center'
  }
});
