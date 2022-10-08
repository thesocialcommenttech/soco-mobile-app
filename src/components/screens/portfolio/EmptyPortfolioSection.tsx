import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Blue } from '~/src/utils/colors';
import EmptyMessage, { EmptyMessageProps } from '../../theme/EmptyMessage';
import Button from '../../theme/Button';

export default function EmptyPortfolioSection(props: {
  mine: boolean;
  addBtnText: string;
  message: string;
  messageForMe: string;
  onAddBtnPress: () => void;
  emptyMessageProps?: EmptyMessageProps;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ alignItems: 'center' }, props.style]}>
      <EmptyMessage
        message={props.mine ? props.message : props.messageForMe}
        center
        {...props.emptyMessageProps}
      />
      {props.mine && (
        <Button
          type="filled"
          size="xs"
          highlightColor={Blue[100]}
          btnStyle={{
            marginTop: 10,
            alignSelf: 'center',
            backgroundColor: Blue[50],
            paddingHorizontal: 10
          }}
          onPress={props.onAddBtnPress}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={20}
              color={Blue.primary}
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: Blue.primary }}>{props.addBtnText}</Text>
          </View>
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
