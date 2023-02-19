import {
  StyleSheet,
  Text,
  View,
  Animated,
  ActivityIndicator
} from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Black } from '../../../utils/colors';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import { getUserInterests } from '~/src/utils/services/settings_services/interests_services/getUserInterests.service';
import Categorybox from '~/src/components/categoryBox';
import Button from '~/src/components/theme/Button';
import Loading from '~/src/components/theme/Loading';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import { Interests } from '~/src/utils/typings/settings_interfaces/interests_interface/getInterestCategories.interface';
import { isNumber } from 'lodash';
import { removeUserInterest } from '~/src/utils/services/user-profile_service/removeUseInterests.service';
import {
  InterestSelectorDataProvider,
  useInterestData
} from '~/src/state/InterestSelectorState';
import UpdateInterestModal from '~/src/components/modals/UpdateInterestModal';
import * as Sentry from '@sentry/react-native';
import { addAxiosErrorDataBreadcrumb } from '~/src/utils/monitoring/sentry';

export const UserInterestCategory = memo(function (props: {
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
      addAxiosErrorDataBreadcrumb(error);
      Sentry.captureException(error);
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
});

const AddInterestButton = memo(function () {
  const [showModal, setShowModal] = useState(false);
  const [_, { clearSelectedCategories }] = useInterestData(data => null);

  return (
    <>
      <UpdateInterestModal
        showModal={showModal}
        onClose={() => {
          clearSelectedCategories();
          setShowModal(false);
        }}
      />
      <Button
        type="outlined"
        size="md"
        fullWidth
        text="Add More Interests"
        btnStyle={{
          marginTop: 20,
          borderStyle: 'dashed'
        }}
        onPress={() => setShowModal(true)}
      />
    </>
  );
});

function AddInterestsCTA() {
  const [availableSelection] = useInterestData(data => data.availableSelection);

  if (availableSelection <= 0) {
    return null;
  }

  return (
    <>
      <Text style={{ marginTop: 30, fontSize: 14, color: Black[600] }}>
        You can select {availableSelection} more interest(s)
      </Text>

      <AddInterestButton />
    </>
  );
}

function UserInterests() {
  const auth = useSelector((root: IRootReducer) => root.auth);
  const [loading, setLoading] = useState(true);
  const [userInterests, { setUserInterestList, removeUserInterestList }] =
    useInterestData(data => data.userInterestList);

  async function fetchUserInterests() {
    setLoading(true);
    const result = await getUserInterests(auth.user._id);
    if (result.data.success) {
      setUserInterestList(result.data.interested_categories);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUserInterests();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SectionHeader label="My Interests" style={styles.fCont}>
        {isNumber(userInterests?.length) && (
          <Text style={styles.heading_subText}>
            Total {userInterests?.length} Interests
          </Text>
        )}
      </SectionHeader>
      <View style={styles.selectedCategories}>
        {userInterests?.length > 0 ? (
          userInterests?.map((interest, i) => (
            <UserInterestCategory
              key={interest._id}
              interest={interest}
              onRemove={() => removeUserInterestList(i)}
            />
          ))
        ) : (
          <Text style={{ color: Black[500] }}>
            We don't know any of your interests
          </Text>
        )}
      </View>
      <AddInterestsCTA />
    </View>
  );
}

export default function Interest() {
  return (
    <InterestSelectorDataProvider maxAllowedSelection={10}>
      <UserInterests />
    </InterestSelectorDataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  selectedCategories: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
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
  }
});
