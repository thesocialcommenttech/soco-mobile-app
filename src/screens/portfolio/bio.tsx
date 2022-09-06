import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { staticFileSrc } from '~/src/utils/methods';
import Button from '~/src/components/theme/Button';
import { Black } from '~/src/utils/colors';
import Video from '~/src/components/theme/Video';
import Bottomsheet, {
  DropdownOption
} from '~/src/components/bottomsheet/Bottomsheet';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { Portfolio_ScreenProps } from '~/src/types/navigation/portfolio';

export default function Bio() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { profile, portfolio } = usePortfolioData();

  const navigation = useNavigation<Portfolio_ScreenProps['navigation']>();

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => (
          <PortfolioUpdateBtn
            buttonProps={{
              onPress: () => {
                setModalVisible(true);
              }
            }}
          />
        )
      });
    }, [navigation])
  );

  return (
    <ScrollView>
      <>
        <View style={styles.container}>
          <Bottomsheet
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          >
            <DropdownOption
              optionKey="update_social_account"
              label="Update Social Accounts"
              onOptionPress={option => {
                setModalVisible(false);
                navigation.navigate('AddSocialAccounts');
              }}
            />
            <DropdownOption
              optionKey="update_bio"
              label="Update Bio"
              onOptionPress={option => {
                setModalVisible(false);
                navigation.navigate('Updatebio');
              }}
            />
          </Bottomsheet>
          {/* <Modal
            visible={showUpdateModal}
            animationType="slide"
            onDismiss={() => setShowUpdateModal(false)}
            // backdropColor="black"
            // backdropOpacity={0.3}
            // animationIn="slideInUp"
            // coverScreen={true}
            presentationStyle="overFullScreen"
            style={styles.modal1}
            // onBackdropPress={() => setShowUpdateModal(false)}
          >
            <UpdateBio />
          </Modal> */}

          <View style={styles.imageview}>
            <Image
              style={styles.userProfileImage}
              source={{ uri: staticFileSrc(profile?.profileImage) }}
            />
            <Text style={styles.userName}>{profile?.name}</Text>
            <Text style={styles.userEmail}>{profile?.email}</Text>
            <View style={styles.socialAccountCt}>
              {portfolio?.social_accounts?.facebook && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="facebook"
                    size={28}
                    color="#1877F2"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {portfolio?.social_accounts?.instagram && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="instagram"
                    size={28}
                    color="#C13584"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {portfolio?.social_accounts?.twitter && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="twitter"
                    size={28}
                    color="#1DA1F2"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {portfolio?.social_accounts?.github && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="github"
                    size={28}
                    color="#333333"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {portfolio?.social_accounts?.linkedin && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="linkedin"
                    size={28}
                    color="#0077B5"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
            </View>
          </View>
          <View style={styles.introVideo}>
            <Video
              source={{ uri: portfolio?.intro_video_url }}
              style={styles.introVideo}
              // disableBack={true}
              // disableFullscreen={true}
              // disableTimer={true}
              // paused={true}
            />
          </View>
          <View style={styles.bioCt}>
            <View style={styles.sectionheader}>
              <Text style={styles.headTitle}>Biography</Text>
              {/* <Button onPress={() => setModalVisible(true)} size="sm">
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={16}
                  color={Black[500]}
                />
              </Button> */}
            </View>
            <Text style={styles.bio}>{portfolio?.bio}</Text>
          </View>
        </View>
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: 'white',
    // paddingBottom: '2%'
  },
  text: {
    color: 'black'
  },
  userProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 60
  },
  imageview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  socialAccountCt: {
    marginTop: 10,
    flexDirection: 'row'
  },
  socialIconBtn: {},
  userName: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    marginTop: 10
  },
  userEmail: {
    color: Black[600]
    // marginTop: 5,
    // fontSize: 16
    // marginBottom: '7%'
  },
  introVideo: { marginTop: 10 },
  bioCt: {
    padding: 20,
    paddingTop: 15
  },
  sectionheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto-Medium'
  },
  bio: {
    color: Black[600],
    fontSize: 14,
    marginTop: 10,
    lineHeight: 21
  },
  modal1: {
    // width: '100%',
    // height: '100%',
    // marginLeft: 0,
    // marginBottom: 0
  },
  modalrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  modalDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  optionview: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%'
  }
});
