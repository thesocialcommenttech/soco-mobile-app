import { Modal, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';
import { updateBio } from '~/src/utils/services/user-profile_service/updateBio.service';
import { useProfileSpliced } from '~/src/state/profileScreenState';
import { Input } from '../../theme/Input';
import Button from '../../theme/Button';
import Toast from 'react-native-toast-message';

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

  const isValidLength = useMemo(() => bio?.length < 150, [bio]);

  const update = async () => {
    try {
      setLoading(true);
      const result = await updateBio({ bio });
      if (result.data.success) {
        _updateBio(result.data.bio);
        Toast.show({
          text1: 'Profile bio updated'
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setModalVisible1(false);
  };

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
          <Button onPress={() => setModalVisible1(false)} size="xs">
            <MaterialCommunityIcon name="close" size={20} color={Black[500]} />
          </Button>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Input
            style={styles.bioInput}
            inputProp={{
              onChangeText: text => {
                setBio(text);
              },
              style: { paddingHorizontal: 20 },
              value: bio,
              maxLength: 150,
              multiline: true,
              placeholder: 'Write about yourself',
              spellCheck: false,
              autoCorrect: false,
              autoComplete: 'off',
              autoCapitalize: 'none'
            }}
            error={!isValidLength && 'Maximum 150 characters allowed'}
          />
          {isValidLength && (
            <Text style={styles.maxChar1}>
              Max Characters: {bio?.length ?? 0}/150
            </Text>
          )}
          <Button
            text="Update"
            disabled={loading}
            fullWidth
            processing={loading}
            type="filled"
            btnStyle={styles.updateBtn1}
            // btnStyle={[styles.updateBtn1, loading && styles.disabledBtn]}
            onPress={update}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  maxChar1: {
    marginTop: 5,
    color: Black[600],
    fontSize: 14
  },
  updateBtn1: {
    marginTop: 20
    // backgroundColor: Colors.Secondary,
    // borderRadius: 8,
    // paddingVertical: '4%',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  // updateTxt: {
  //   color: 'white',
  //   fontWeight: '600',
  //   fontSize: 14,
  //   fontFamily: 'Roboto-Medium'
  // },
  // closeBtn1: {
  //   color: Colors.Gray400,
  //   alignSelf: 'flex-end'
  // },
  bioTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: 'black'
    // marginTop: '2%'
  },
  bioInput: {
    // marginTop: 20
    // backgroundColor: 'white',
    // borderColor: Colors.GrayBorder,
    // color: 'black',
    // borderWidth: 1,
    // borderRadius: 10,
    // padding: 20,
    // height: '22%',
    // textAlignVertical: 'top',
    // fontFamily: 'Roboto-Medium',
    // lineHeight: 21
  },
  modalView1: {
    backgroundColor: 'white',
    // height: '100%',
    // width: '100%',
    flex: 1
    // paddingHorizontal: 20
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  }
  // closeBtn: {
  //   color: Colors.Gray400,
  //   alignSelf: 'flex-end',
  //   padding: 5
  // },
  // updateBtn: {
  //   backgroundColor: Colors.Secondary,
  //   borderRadius: 8,
  //   marginTop: '6%',
  //   paddingVertical: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // disabledBtn: {
  //   backgroundColor: Colors.Gray200
  // }
});
