import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useMemo, useState } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '~/src/utils/colors';
import { updateCaption } from '~/src/utils/services/user-profile_service/updateCaption.service';
import { useProfileSpliced } from '~/src/state/profileScreenState';

export default function UpdateCaptionModal({
  modalVisible,
  setModalVisible
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [_updateCaption, _caption] = useProfileSpliced(state => [
    state.updateCaption,
    state.userProfile.caption
  ]);

  const [caption, setCaption] = useState<string>(_caption);
  const [loading, setLoading] = useState(false);

  const show = useMemo(() => modalVisible, [modalVisible]);
  const isValidLength = useMemo(() => caption?.length > 150, [caption]);

  async function submitCaption() {
    try {
      setLoading(true);
      const result = await updateCaption({ caption: caption });

      if (result.data.success) {
        _updateCaption(result.data.caption);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <Text style={styles.capTitle}>Caption</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeBtn}
          >
            <MaterialCommunityIcon
              name="close"
              size={24}
              color={Colors.Gray400}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.captionInput}
          onChangeText={text => {
            setCaption(text);
          }}
          value={caption}
          maxLength={150}
          multiline={true}
          placeholder={"Write what's in your mind"}
          placeholderTextColor={'gray'}
          spellCheck={false}
          autoCorrect={false}
          autoComplete="off"
          autoCapitalize="none"
        />
        <Text style={styles.maxChar}>
          Max Characters: {caption?.length ?? 0}/150
        </Text>
        <TouchableOpacity
          style={[styles.updateBtn, loading && styles.disabledBtn]}
          disabled={loading}
          onPress={submitCaption}
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.Gray600} />
          ) : (
            <Text style={styles.updateTxt}>Update</Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 20
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  closeBtn: {
    color: Colors.Gray400,
    alignSelf: 'flex-end',
    padding: 5
  },
  capTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black
    // marginTop: '2%'
  },
  captionInput: {
    backgroundColor: 'white',
    marginTop: '8%',
    borderColor: Colors.GrayBorder,
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: '22%',
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Medium',
    lineHeight: 21
  },
  maxChar: {
    marginTop: '5%',
    color: Colors.Gray200,
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  updateBtn: {
    backgroundColor: Colors.Secondary,
    borderRadius: 8,
    marginTop: '6%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: Colors.Gray200
  },
  updateTxt: {
    color: 'white',
    flexGrow: 1,
    textTransform: 'capitalize',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  }
});
