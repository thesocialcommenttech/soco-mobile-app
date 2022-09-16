import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useMemo, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { staticFileSrc } from '~/src/utils/methods';
import Button from '~/src/components/theme/Button';
import { Black } from '~/src/utils/colors';
import Video from '~/src/components/theme/Video';
import Bottomsheet, {
  DropdownOption
} from '~/src/components/bottomsheet/Bottomsheet';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { PortfolioSubTab_ScreenProps } from '~/src/types/navigation/portfolio';
import PortfolioDropdown from '~/src/components/screens/portfolio/PortfolioDropdown';

export default function Bio() {
  const [modalVisible, setModalVisible] = useState(false);
  const { profile, portfolio } = usePortfolioData();
  const [showThemesList, setShowThemesList] = useState(false);

  const navigation = useNavigation<PortfolioSubTab_ScreenProps['navigation']>();
  const route = useRoute<PortfolioSubTab_ScreenProps['route']>();
  const mine = useMemo(() => route.params?.mine, [route.params]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => {
          if (mine) {
            return (
              <>
                <Button
                  onPress={() => setShowThemesList(true)}
                  size="xs"
                  btnStyle={{ marginRight: 10 }}
                >
                  <MaterialCommunityIcons
                    name="layers-outline"
                    size={24}
                    color="black"
                  />
                </Button>
                <PortfolioUpdateBtn
                  buttonProps={{
                    onPress: () => {
                      setModalVisible(true);
                    }
                  }}
                />
              </>
            );
          }
          return null;
        }
      });
    }, [navigation])
  );

  return (
    <>
      <PortfolioDropdown
        visible={showThemesList}
        navigation={navigation}
        username={profile.username}
        onClose={() => setShowThemesList(false)}
      />
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
      <ScrollView>
        <View style={styles.container}>
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
          {portfolio?.intro_video_url && (
            <View style={styles.introVideo}>
              <Video
                source={{ uri: portfolio?.intro_video_url }}
                style={styles.introVideo}
              />
            </View>
          )}
          <View style={styles.bioCt}>
            <View style={styles.sectionheader}>
              <Text style={styles.headTitle}>Biography</Text>
            </View>
            <Text style={styles.bio}>{portfolio?.bio}</Text>
          </View>
        </View>
      </ScrollView>
    </>
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
