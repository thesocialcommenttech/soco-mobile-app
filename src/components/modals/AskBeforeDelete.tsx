import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Bottomsheet from '../bottomsheet/Bottomsheet';
import Button from '../theme/Button';
import { Black, Red } from '~/src/utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AskBeforeDelete(props: {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <Bottomsheet
      visible={props.show}
      onClose={() => props.onClose?.()}
      bodyStyle={styles.bottomsheetBody}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="alert-outline"
          size={24}
          adjustsFontSizeToFit
          style={styles.alertIcon}
        />
        <Text style={styles.headerText}>Delete Permanently</Text>
      </View>
      <Text style={styles.descText}>
        You will not be able to reverse this action. Do you really want to
        delete this post.
      </Text>
      <View style={styles.actionBtnCt}>
        <Button
          size="sm"
          onPress={() => {
            props.onClose?.();
            props.onDelete?.();
          }}
          textStyle={{ color: Black[700] }}
          text="YES, DELETE"
        />
        <Button
          type="filled"
          size="sm"
          btnStyle={{ minWidth: 80, marginLeft: 20 }}
          onPress={() => props.onClose?.()}
          text="No"
        />
      </View>
    </Bottomsheet>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: 'black',
    marginLeft: 15
  },
  alertIcon: {
    color: Red.primary,
    backgroundColor: Red[100],
    borderRadius: 100,
    padding: 12,
    paddingRight: 10,
    paddingTop: 10,
    alignSelf: 'flex-start'
  },
  descText: {
    // fontSize: 16,
    fontFamily: 'Roboto',
    color: Black[600],
    lineHeight: 21,
    marginTop: 10
  },
  bottomsheetBody: {
    paddingHorizontal: 25,
    paddingVertical: 25
  },
  actionBtnCt: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  }
});
