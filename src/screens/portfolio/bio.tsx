import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { staticFileSrc } from '~/src/utils/methods';
import Button, { ButtonProps } from '~/src/components/theme/Button';
import { Black, Blue } from '~/src/utils/colors';
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
import EmptyPortfolioSection from '~/src/components/screens/portfolio/EmptyPortfolioSection';
import Color from 'color';

function AddIntroVideoBtn(props: ButtonProps) {
  const windowDim = Dimensions.get('window');

  return (
    <Button
      type="outlined"
      fullWidth
      {...props}
      btnStyle={[
        { height: (windowDim.width - 40) / (16 / 9) },
        styles.addIntroVideoBtn,
        props.btnStyle
      ]}
    >
      <View style={{ alignItems: 'center' }}>
        <MaterialCommunityIcons
          name="video-outline"
          size={34}
          color={Blue[400]}
        />
        <Text
          style={{
            color: Blue[400],
            fontFamily: 'Roboto-Medium',
            textTransform: 'uppercase'
          }}
        >
          ADD INTRO VIDEO
        </Text>
      </View>
    </Button>
  );
}

export default function Bio() {
  const [modalVisible, setModalVisible] = useState(false);
  const { profile, portfolio } = usePortfolioData();
  const [showThemesList, setShowThemesList] = useState(false);

  const navigation = useNavigation<PortfolioSubTab_ScreenProps['navigation']>();
  const route = useRoute<PortfolioSubTab_ScreenProps['route']>();
  const mine = useMemo(() => route.params?.mine, [route.params]);

  const hasSocialAccounts = useMemo(
    () =>
      Object.values(portfolio.social_accounts ?? {}).reduce(
        (p, c) => p || !!c,
        false
      ),
    [portfolio?.social_accounts]
  );

  const haveAllSocialAccounts = useMemo(
    () =>
      typeof portfolio.social_accounts === 'object' &&
      Object.values(portfolio.social_accounts).reduce((p, c) => p && !!c, true),
    [portfolio?.social_accounts]
  );

  const openBioForm = () => navigation.navigate('Updatebio');
  const openSocialAccForm = () => navigation.navigate('AddSocialAccounts');
  const openIntroVideoForm = () => navigation.navigate('AddIntroVideo');

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => {
          if (mine) {
            return (
              <>
                <Button
                  text="Themes"
                  onPress={() => setShowThemesList(true)}
                  size="sm"
                  btnStyle={{ marginRight: 5 }}
                  textStyle={{ color: 'black' }}
                />
                <PortfolioUpdateBtn
                  buttonProps={{ onPress: () => setModalVisible(true) }}
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
          icon="facebook"
          label={`${hasSocialAccounts ? 'Update' : 'Add'} Social Accounts`}
          onOptionPress={() => {
            setModalVisible(false);
            openSocialAccForm();
          }}
        />
        <DropdownOption
          optionKey="update_bio"
          icon="pen"
          label={`${portfolio?.bio ? 'Update' : 'Add'} Bio`}
          onOptionPress={() => {
            setModalVisible(false);
            openBioForm();
          }}
        />
        <DropdownOption
          optionKey="update_intro_video"
          icon="video-outline"
          label={`${
            portfolio?.intro_video_url ? 'Update/Remove' : 'Add'
          } Intro Video`}
          onOptionPress={() => {
            setModalVisible(false);
            openIntroVideoForm();
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
                    color="#1877F2"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {portfolio?.social_accounts?.instagram && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="instagram"
                    color="#C13584"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {portfolio?.social_accounts?.twitter && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="twitter"
                    color="#1DA1F2"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {portfolio?.social_accounts?.github && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="github"
                    color="#333333"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {portfolio?.social_accounts?.linkedin && (
                <Button onPress={() => {}} size="sm">
                  <MaterialCommunityIcons
                    name="linkedin"
                    size={30}
                    color="#0077B5"
                    style={styles.socialIconBtn}
                  />
                </Button>
              )}
              {mine && !haveAllSocialAccounts && (
                <Button
                  type="outlined"
                  size="xs"
                  onPress={openSocialAccForm}
                  btnStyle={{
                    borderStyle: 'dashed',
                    borderRadius: 20,
                    alignSelf: 'center',
                    padding: 3,
                    marginLeft: 10
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={16}
                    color={Blue.primary}
                  />
                </Button>
              )}
            </View>
          </View>
          {portfolio?.intro_video_url ? (
            <Video
              source={{ uri: staticFileSrc(portfolio?.intro_video_url) }}
              style={styles.introVideo}
            />
          ) : (
            mine && (
              <AddIntroVideoBtn
                onPress={openIntroVideoForm}
                btnStyle={styles.introVideo}
              />
            )
          )}
          <View style={styles.bioCt}>
            <View style={styles.sectionheader}>
              <Text style={styles.headTitle}>Biography</Text>
            </View>
            {portfolio?.bio ? (
              <Text style={styles.bio}>{portfolio?.bio}</Text>
            ) : (
              <EmptyPortfolioSection
                mine={mine}
                onAddBtnPress={openBioForm}
                addBtnText="Add Bio"
                message="You have no bio yet"
                messageForMe="User has no bio yet"
              />
            )}
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
    borderRadius: 60,
    backgroundColor: Black[200]
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
  socialIconBtn: {
    fontSize: 28
  },
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
  introVideo: { marginTop: 20 },
  bioCt: {
    padding: 20,
    paddingTop: 15
  },
  sectionheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  headTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto-Medium'
  },
  bio: {
    color: Black[600],
    fontSize: 14,
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
  },
  addIntroVideoBtn: {
    marginHorizontal: 20,
    borderStyle: 'dashed',
    justifyContent: 'center'
  }
});
