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
import { updateBio } from '~/src/utils/services/user-profile_service/updateBio.service';
import { useProfileSpliced } from '~/src/state/profileScreenState';

export default function UpdateBioModal({
  modalVisible1,
  setModalVisible1
}: {
  modalVisible1: boolean;
  setModalVisible1: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [_updateBio, _bio] = useProfileSpliced(state => [
    state.updateBio,
    state.userProfile.bio
  ]);

  const [bio, setBio] = useState<string>(_bio);
  const [loading, setLoading] = useState(false);

  const isValidLength = useMemo(() => bio?.length > 150, [bio]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible1}
      onRequestClose={() => {
        setModalVisible1(!modalVisible1);
      }}
    >
      <View style={styles.modalView1}>
        <View style={styles.modalHeader}>
          <Text style={styles.bioTitle}>Bio</Text>
          <TouchableOpacity
            onPress={() => setModalVisible1(false)}
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
          style={styles.bioInput}
          onChangeText={text => {
            setBio(text);
          }}
          value={bio}
          maxLength={150}
          multiline={true}
          placeholder={'Write about yourself'}
          placeholderTextColor={'gray'}
          spellCheck={false}
          autoCorrect={false}
          autoComplete="off"
          autoCapitalize="none"
        />
        <Text style={styles.maxChar1}>
          Max Characters: {bio?.length ?? 0}/150
        </Text>
        <TouchableOpacity
          style={[styles.updateBtn1, loading && styles.disabledBtn]}
          disabled={loading}
          onPress={async () => {
            try {
              setLoading(true);
              const result = await updateBio({ bio });
              if (result.data.success) {
                _updateBio(result.data.bio);
              }
            } catch (error) {
              console.error(error);
            }
            setLoading(false);
            setModalVisible1(false);
          }}
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
  maxChar1: {
    marginTop: '5%',
    color: Colors.Gray200,
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  updateBtn1: {
    backgroundColor: Colors.Secondary,
    borderRadius: 8,
    marginTop: '6%',
    paddingVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  closeBtn1: {
    color: Colors.Gray400,
    alignSelf: 'flex-end'
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
    marginTop: '2%'
  },
  bioInput: {
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
  modalView1: {
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
  closeBtn: {
    color: Colors.Gray400,
    alignSelf: 'flex-end',
    padding: 5
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
  }
});
