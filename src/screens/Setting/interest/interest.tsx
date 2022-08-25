import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Black, Blue, Colors } from '../../../utils/colors';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import { Input } from '~/src/components/theme/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUserInterests } from '~/src/utils/services/settings_services/interests_services/getUserInterests.service';
import { GetUserInterestsResponse } from '~/src/utils/typings/settings_interfaces/interests_interface/getUserInterests.interface';
import Categorybox from '~/src/components/categoryBox';
import Button from '~/src/components/theme/Button';
import Loading from '~/src/components/theme/Loading';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import { getInterestCategories } from '~/src/utils/services/settings_services/interests_services/getInterestCategories.service';
import {
  GetInterestCategoriesResponse,
  Interests
} from '~/src/utils/typings/settings_interfaces/interests_interface/getInterestCategories.interface';
import { isNumber } from 'lodash';
import { removeUserInterest } from '~/src/utils/services/user-profile_service/removeUseInterests.service';
import { addUserInterests } from '~/src/utils/services/user-profile_service/userInterests.service';
import { SelectionCategory } from '../../categories/categories';

function UserInterestCategory(props: {
  onRemove: () => void;
  interest: Interests;
}) {
  const fadeOut = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const shrinkIn = useRef(new Animated.Value(1)).current;

  const [loading, setLoading] = useState(false);

  function toggleLoading() {
    if (loading) {
      setLoading(false);
      Animated.parallel([
        Animated.timing(fadeOut, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        })
      ]).stop();
    } else {
      setLoading(true);

      Animated.parallel([
        Animated.timing(fadeOut, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        })
      ]).start();
    }
  }

  async function removeInterest() {
    try {
      toggleLoading();
      const result = await removeUserInterest(props.interest._id);
      if (result.data.success) {
        Animated.parallel([
          Animated.timing(fadeOut, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          }),
          Animated.timing(fadeIn, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          }),
          Animated.timing(shrinkIn, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          })
        ]).start(() => {
          props.onRemove();
        });
      }
    } catch (error) {
      toggleLoading();
    }
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={{ opacity: fadeOut, transform: [{ scaleX: shrinkIn }] }}
      >
        <Categorybox
          text={props.interest.category}
          selected={true}
          cancelable={true}
          onCancel={loading ? undefined : removeInterest}
        />
      </Animated.View>

      <Animated.View style={{ opacity: fadeIn, position: 'absolute' }}>
        <ActivityIndicator size={16} color={Black[500]} animating={loading} />
      </Animated.View>
    </View>
  );
}

export default function Interest() {
  const [userInterests, setUserInterests] =
    useState<GetUserInterestsResponse['interested_categories']>();
  const [loading, setLoading] = useState(true);
  const auth = useSelector((root: IRootReducer) => root.auth);

  async function fetchUserInterests() {
    setLoading(true);
    const result = await getUserInterests(auth.user._id);
    if (result.data.success) {
      setUserInterests(result.data.interested_categories);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUserInterests();
  }, []);

  return (
    <>
      <SettingScreenHeader title="Interests" />

      <View style={styles.container}>
        <SectionHeader label="My Interests" style={styles.fCont}>
          {isNumber(userInterests?.length) && (
            <Text style={styles.heading_subText}>
              Total {userInterests?.length} Interests
            </Text>
          )}
        </SectionHeader>

        {loading ? (
          <Loading />
        ) : (
          <View style={styles.selectedCategories}>
            {userInterests?.length > 0 ? (
              userInterests?.map((interest, i) => (
                <UserInterestCategory
                  key={interest._id}
                  interest={interest}
                  onRemove={() => {
                    userInterests.splice(i, 1);
                    setUserInterests([...userInterests]);
                  }}
                />
              ))
            ) : (
              <Text style={{ color: Black[500] }}>
                We don't know any of your interests
              </Text>
            )}
          </View>
        )}

        <AddInterestCategories selectedInterestsCount={userInterests?.length} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  fCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading_subText: {
    // fontFamily: 'Roboto-Medium',
    color: Black[500],
    fontSize: 13
  },
  selectedCategories: {
    marginTop: '6%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  addcategories: {
    marginTop: '8%'
  },
  searchbox: {
    marginTop: '7%'
  },
  allcategory: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  updatebtn: {
    marginTop: 20
  }
});

function AddInterestCategories(props: {
  selectedInterestsCount: number;
  onInterestAdded?: (interests: Interests[]) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<SelectionCategory[]>([]);
  const [submittingInterests, setSubmittingInterests] = useState(false);

  const unselectedCategories = useMemo(
    () => categories.filter(item => !item.selected),
    [categories]
  );

  const selectedCategories = useMemo(
    () => categories.filter(item => item.selected),
    [categories]
  );

  async function submitUserInterests() {
    setSubmittingInterests(true);
    const result = await addUserInterests(selectedCategories);

    if (result.data.success) {
      props.onInterestAdded?.(selectedCategories);
    }
    setSubmittingInterests(false);
  }

  function toggleCategorySelection(itemIndex: number, select: boolean) {
    categories[itemIndex].selected = select;
    setCategories([...categories]);
  }

  async function fetchData() {
    setLoading(true);
    const result = await getInterestCategories();

    if (result.data.success) {
      setCategories(result.data.interest_categories);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <View style={styles.addcategories}>
        <SectionHeader label="Add Interests" style={styles.fCont}>
          {isNumber(props.selectedInterestsCount) && (
            <Text style={styles.heading_subText}>
              {10 - props.selectedInterestsCount - selectedCategories?.length}{' '}
              selection Left
            </Text>
          )}
        </SectionHeader>

        <Input
          style={styles.searchbox}
          inputContainer={{ paddingLeft: 15 }}
          inputProp={{
            placeholder: 'Search',
            style: {
              paddingHorizontal: 15,
              paddingVertical: 10,
              paddingTop: 10,
              paddingLeft: 15
            },
            onChangeText: text => {}
          }}
          prefix={<MaterialCommunityIcons name="magnify" size={20} />}
        />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <>
          {selectedCategories?.length > 0 && (
            <View style={styles.selectedCategories}>
              {selectedCategories.map((category, i) => (
                <Categorybox
                  key={category._id}
                  text={category.category}
                  cancelable={true}
                  selected={true}
                  onCancel={() => {
                    toggleCategorySelection(category.index, false);
                  }}
                />
              ))}
            </View>
          )}
          <ScrollView contentContainerStyle={styles.allcategory}>
            {unselectedCategories?.map(category => (
              <Categorybox
                key={category._id}
                text={category.category}
                onPress={() => {
                  toggleCategorySelection(category.index, true);
                }}
              />
            ))}
          </ScrollView>
          <Button
            text="Save"
            btnStyle={styles.updatebtn}
            type="filled"
            fullWidth={true}
            disabled={submittingInterests}
            processing={submittingInterests}
            onPress={submitUserInterests}
          />
        </>
      )}
    </>
  );
}
