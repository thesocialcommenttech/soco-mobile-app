import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

export default function SettingTab({ name }: { name: string }) {
  const navigation = useNavigation();

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
              <Icon name="user" size={42} color="black" />
              <View style={styles.name}>
                <Text style={styles.nametext}>{name}</Text>
              </View>
            </View>
            <View>
              <Icon name="chevron-right" size={42} />
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
    flexDirection: 'row'
  },
  name: {
    alignSelf: 'center',
    marginLeft: '2%'
  },
  nametext: {
    color: 'black'
  },
  bottomruler: {
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1.5,
    marginTop: '3%'
  }
});
