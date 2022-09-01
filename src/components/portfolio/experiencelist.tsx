import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Experience as IExperience } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import dayjs from 'dayjs';
import Button from '../theme/Button';
import { Black } from '~/src/utils/colors';

export default function Experience(props: {
  data: IExperience;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}>{props.data.title}</Text>
      <Button
        size="sm"
        onPress={() => {
          // props.toggleModal();
        }}
        btnStyle={styles.dropdownBtn}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={17}
          color={Black[600]}
        />
      </Button>
      <Text style={styles.companyNduration}>
        {props.data.company && (
          <>
            @ {props.data.company}
            {'  |  '}
          </>
        )}
        {dayjs(props.data.from).format('MMM YYYY')}
        {'  '}-{'  '}
        {props.data.ongoing ? 'Now' : dayjs(props.data.to).format('MMM YYYY')}
      </Text>
      <Text style={styles.description}>{props.data.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginRight: 45,
    textAlignVertical: 'bottom'
  },
  companyNduration: {
    color: 'black',
    marginTop: 5,
    marginRight: 45
  },
  description: {
    color: Black[600],
    lineHeight: 20,
    marginTop: 5
  },
  dropdownBtn: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});
