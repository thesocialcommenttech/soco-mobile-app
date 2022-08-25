import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingScreenHeader({
  title,
  showBackBtn = true
}: {
  title: string;
  showBackBtn?: boolean;
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.flexrow}>
      {showBackBtn && (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color="black"
            style={styles.backBtn}
          />
        </TouchableWithoutFeedback>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flexrow: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  backBtn: {
    padding: 10,
    margin: -10,
    marginRight: 0
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Roboto-Medium'
  }
});
