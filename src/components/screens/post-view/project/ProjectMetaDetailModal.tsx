import React, { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Black } from '~/src/utils/colors';

interface MetaDetailModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  value: ReactNode;
}

export default function MetaDetailModal(props: MetaDetailModalProps) {
  return (
    <ReactNativeModal
      isVisible={props.show}
      onDismiss={props.onClose}
      onBackdropPress={props.onClose}
      onBackButtonPress={props.onClose}
      onSwipeComplete={() => props.onClose?.()}
      swipeDirection="down"
      propagateSwipe
      useNativeDriverForBackdrop
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <View style={styles.metaDetail_ModalCt}>
        <View
          style={{
            width: 100,
            height: 5,
            borderRadius: 5,
            backgroundColor: Black[300],
            alignSelf: 'center',
            marginBottom: 15,
            marginTop: -5
          }}
        />
        <Text style={styles.metaDetail_Title}>{props.title}</Text>
        <ScrollView
          style={{ marginHorizontal: -20, paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <TouchableWithoutFeedback>
            <Text style={styles.metaDetail_Value}>{props.value}</Text>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  metaDetail_ModalCt: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minHeight: '40%'
  },
  metaDetail_Title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    marginBottom: 10
  },
  metaDetail_Value: {
    color: 'black',
    fontSize: 15,
    lineHeight: 20
  }
});
