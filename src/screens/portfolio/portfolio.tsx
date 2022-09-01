import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bio from './bio';
import Experiences from './experiences';
import Certifications from './certifications';
import Educations from './educations';
import Skills from './skills';
import Works from './works';
import { getPortforlioProfileData } from '~/src/utils/services/user-portfolio_services/getPortforlioProfileData.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import {
  PortfolioTabStack,
  PortfolioTabStackScreenProps
} from '~/src/utils/typings/stack';
import Loading from '~/src/components/theme/Loading';
import { getPortforlioWorkData } from '~/src/utils/services/user-portfolio_services/getPortforlioWorkData.service';
import Button, { ButtonProps } from '~/src/components/theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { Black, Blue } from '~/src/utils/colors';

const Tab = createMaterialTopTabNavigator<PortfolioTabStack>();

export function PortfolioUpdateBtn(props: { buttonProps: ButtonProps }) {
  return (
    <Button size="xs" {...props.buttonProps}>
      <MaterialCommunityIcons
        name="plus-circle-outline"
        size={24}
        color="black"
      />
    </Button>
  );
}

export default function Portfolio() {
  const navigation = useNavigation();
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  const route = useRoute<PortfolioTabStackScreenProps['route']>();
  const { portfolio, profile, setPortfolio, setProfile } = usePortfolioData();
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    const [profileResult, portfolioResult] = await Promise.all([
      getPortforlioProfileData(route.params.username),
      getPortforlioWorkData(route.params.username)
    ]);

    if (profileResult.data.success && portfolioResult.data.success) {
      setProfile(profileResult.data.data);
      setPortfolio(portfolioResult.data.data);
    }

    setLoading(false);
  }

  useFocusEffect(() => {
    if (!profile && !portfolio) {
      fetchData();
    }
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Bio"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarPressColor: Black[200],
          tabBarLabelStyle: { fontSize: 14, textTransform: 'capitalize' },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: Black[500],
          tabBarStyle: { elevation: 1 },
          tabBarIndicatorStyle: {
            backgroundColor: Blue.primary,
            height: 1.5
          }
        }}
      >
        <Tab.Screen
          name="Bio"
          initialParams={{ username: authUser.username }}
          component={Bio}
        />
        <Tab.Screen
          name="Experiences"
          initialParams={{ username: authUser.username }}
          component={Experiences}
        />
        <Tab.Screen
          name="Certifications"
          initialParams={{ username: authUser.username }}
          component={Certifications}
        />
        <Tab.Screen
          name="Educations"
          initialParams={{ username: authUser.username }}
          component={Educations}
        />
        <Tab.Screen
          name="Skills"
          initialParams={{ username: authUser.username }}
          component={Skills}
        />
        <Tab.Screen
          name="Works"
          initialParams={{ username: authUser.username }}
          component={Works}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'black'
  },
  flexrow: {
    flexDirection: 'row',
    marginTop: '4.5%',
    paddingLeft: '2%',
    paddingRight: '2%',
    marginLeft: '2%',
    marginBottom: '4%'
  },
  mheader: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600'
  },
  plus: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: '2.5%',
    marginTop: '0.5%'
  },
  modal1: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0
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
    fontSize: 16,
    marginTop: '1.5%'
  },
  modal2: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0,
    height: '100%'
  },
  modal3: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0,
    height: '100%'
  },
  modal4: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0,
    height: '100%'
  },
  updatebioview: {
    backgroundColor: 'white',
    flex: 1
  },
  updatebioheader: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  updatebiotxt: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500'
  },
  textinput: {
    textAlign: 'left',
    textAlignVertical: 'top',
    paddingLeft: 20,
    fontSize: 16,
    color: 'black'
  },
  textinputview: {
    borderWidth: 1,
    borderColor: '#99969F',
    borderRadius: 5,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 25
  },
  button: {
    marginTop: '7%',
    marginBottom: '7%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#0063FF',
    borderRadius: 5,
    alignItems: 'center'
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '500'
  },
  addexperienceview: {
    backgroundColor: 'white',
    flex: 1
  },
  emailTB: {
    marginTop: '-5.5%',
    paddingLeft: 10
  },
  addexpdetails: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  descriptionTB: {
    marginTop: '-6%',
    paddingLeft: 7,
    paddingTop: 7
  },
  dobTB: {
    marginTop: '-6%'
  },
  cal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectionview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '-0.2%',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 15
  },
  select: {
    borderColor: '#FFCA12',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginTop: '4%'
  },
  intextinactive: {
    color: 'black'
  },
  intextactive: {
    color: 'black',
    fontWeight: 'bold'
  },
  selectactive: {
    borderColor: '#FFCA12',
    borderWidth: 1.5,
    borderRadius: 5,
    backgroundColor: '#FFF4CC',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginTop: '4%'
  },
  label: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    fontWeight: '800',
    lineHeight: 14,
    fontStyle: 'normal',
    color: '#000',
    padding: '2%',
    marginBottom: '-3.5%',
    textTransform: 'uppercase'
  },
  labelBox: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    marginLeft: '9.5%',
    zIndex: 9999,
    marginTop: '3%',
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: '-1.5%'
  },
  sliderview: {
    marginTop: '-0.2%',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 15
  },
  slider: {
    marginLeft: 13,
    marginRight: 13
  },
  thumb: {
    height: 15,
    width: 15
  },
  activesliderview: {
    marginTop: '-0.2%',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 15
  },
  addeducationview: {
    backgroundColor: 'white',
    flex: 1
  },
  educationdetail: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  boxoutlineview: {
    marginTop: '-0.2%',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 15
  },
  edutext: {
    color: '#000000',
    fontSize: 15,
    lineHeight: 21
  },
  eduactivetext: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 21
  },
  eduview: {
    borderWidth: 2,
    borderColor: '#FFCA12',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '3%',
    backgroundColor: 'white'
  },
  eduactiveview: {
    borderWidth: 2,
    borderColor: '#FFCA12',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '3%',
    backgroundColor: '#FFF4CC'
  },
  skillnumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '9.5%',
    marginRight: '9%'
  },
  skillnumtext: {
    color: '#BDBDBD',
    fontSize: 16
  },
  numtext: {
    color: '#BDBDBD',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '2%'
  },
  sliderdesign: {
    height: 40
  },
  skillNumberview: {
    backgroundColor: '#E0EBFF',
    padding: 12,
    marginLeft: '2.2%'
  },
  extremeNumberview: {
    backgroundColor: '#F2F2F2',
    padding: 12
  },
  modal7: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
    backgroundColor: 'white'
  },
  workselectiontext: {
    color: 'black',
    fontSize: 16,
    marginTop: '4%',
    marginLeft: '8%',
    marginBottom: '3%'
  },
  addblogview: {
    flexDirection: 'row',
    marginTop: '3%',
    marginLeft: '1%',
    marginRight: '1%',
    justifyContent: 'space-between',
    flex: 1
  },
  addblogimage: {
    height: 80,
    width: 120,
    borderRadius: 7
  },
  addblogtext: {
    color: 'black',
    flexShrink: 1,
    width: 150,
    marginBottom: 5,
    marginLeft: '3%',
    lineHeight: 19,
    fontSize: 15
  },
  blogimageandtextview: {
    flexDirection: 'row'
  },
  addblogbutton: {
    marginTop: '3%',
    marginBottom: '3%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#0063FF',
    borderRadius: 5,
    alignItems: 'center'
  }
});
