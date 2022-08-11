import Color from 'color';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../utils/colors';
import Bottomsheet from './bottomsheet/Bottomsheet';

function DropdownDelete(props: { onDelete: () => void; postId: any }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <MaterialIcon
          name="delete-outline"
          style={styles.deleteBtn}
          size={20}
          color={Colors.Gray200}
        />
      </TouchableOpacity>
      <Bottomsheet
        visible={visible}
        onClose={() => setVisible(false)}
        bodyStyle={styles.bottomsheetBody}
      >
        <Text style={styles.headerText}>Delete Permanently</Text>
        <Text style={styles.descText}>
          You will not be able to reverse this action. Do you really want to
          delete this post.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            underlayColor={Colors.Gray100}
            style={styles.actionBtn}
            onPress={() => {
              setVisible(false);
              props.onDelete?.();
            }}
          >
            <Text style={styles.buttonText}>YES, DELETE</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Color(Colors.Secondary).darken(0.1).hex()}
            style={[styles.actionBtn, styles.noBtn]}
            onPress={() => setVisible(false)}
          >
            <Text style={[styles.buttonText, styles.noBtnText]}>NO</Text>
          </TouchableHighlight>
        </View>
      </Bottomsheet>
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    color: Colors.Black
  },
  descText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    color: 'gray',
    marginTop: 15
  },
  bottomsheetBody: {
    paddingHorizontal: 25,
    paddingVertical: 25
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25
  },
  deleteBtn: {
    padding: 5
  },
  actionBtn: {
    borderRadius: 6,
    marginRight: 20,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  noBtn: {
    backgroundColor: Colors.Secondary,
    width: 100
  },
  buttonText: {
    color: Colors.Gray600,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600'
  },
  noBtnText: {
    color: Colors.White
  }
});

export default DropdownDelete;
