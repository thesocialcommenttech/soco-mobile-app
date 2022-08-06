import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { Colors } from '../../utils/colors';
import { updateBio } from '~/src/utils/services/user-profile_service/updateBio.service';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';
import { RootRouteContext } from '~/src/contexts/root-route.context';

function BioScreen() {
  const [bio, setBio] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { showPostRegisterationFlow } = useContext(RootRouteContext);

  async function submitUserBio() {
    try {
      setLoading(true);
      const result = await updateBio({ bio });
      if (result.data.success) {
        showPostRegisterationFlow(false);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <>
      <OptionalStackHeader
        onProceed={() => submitUserBio()}
        onSkip={() => showPostRegisterationFlow(false)}
        formStage={OptionalFormStage.ADD_BIO}
        disableProceed={loading}
        disableSkip={loading}
        proceedLabel="DONE"
      />
      <View style={styles.container}>
        <Text style={styles.titleTxt}>Add Your Bio</Text>
        <TextInput
          style={styles.bioInput}
          onChangeText={text => {
            setBio(text);
          }}
          value={bio}
          maxLength={150}
          multiline={true}
          placeholder={'Write about yourself'}
          placeholderTextColor={'#99969F'}
          spellCheck={false}
          autoCorrect={false}
          autoComplete="off"
          autoCapitalize="none"
        />
        <Text style={styles.maxChar1}>
          Max Characters: {bio?.length ?? 0}/150
        </Text>
        <TouchableOpacity
          style={[styles.updateImgBtn, loading && styles.disableBtn]}
          onPress={() => {
            if (!loading) {
              submitUserBio();
            }
          }}
        >
          {loading ? (
            <ActivityIndicator color={Colors.Gray200} size={25} />
          ) : (
            <Text style={styles.updateImgTxt}>Add Bio</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

export default BioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: '6%'
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.Black,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '2%'
  },
  bgImage: {
    width: '100%',
    height: '30%',
    marginTop: '8%',
    resizeMode: 'cover'
  },
  selTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '6%'
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
    width: '100%',
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Medium',
    lineHeight: 21
  },
  maxChar1: {
    marginTop: '5%',
    color: Colors.Gray200,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    alignSelf: 'flex-start'
  },
  updateImgBtn: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    width: '100%',
    bottom: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Secondary
  },
  updateImgTxt: {
    color: Colors.Secondary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
    padding: 10
  },
  disableBtn: {
    paddingVertical: 12,
    borderColor: Colors.Gray200
  }
});
