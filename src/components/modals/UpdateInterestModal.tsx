import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import Button from '../theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useInterestData } from '~/src/state/InterestSelectorState';
import { updateUserInterests } from '~/src/utils/services/user-profile_service/userInterests.service';
import { Black } from '~/src/utils/colors';
import { Input } from '../theme/Input';
import { SelectedInterests } from '../Interests/SelectedInterests';
import { AvailableInterestList } from '../Interests/AvialableInterests';
import { debounce } from 'lodash';

function UpdateInterestButton(props: { onInterestAdded: () => any }) {
  const [submittingInterests, setSubmittingInterests] = useState(false);
  const [selectedCategories, { setUserInterestList, clearSelectedCategories }] =
    useInterestData(data => data.selectedCategories);

  async function submitUserInterests() {
    setSubmittingInterests(true);
    const selectedIds = selectedCategories.map(interest => interest._id);
    const result = await updateUserInterests(selectedIds);

    if (result.data.success) {
      setUserInterestList(selectedCategories);
      clearSelectedCategories();
      props?.onInterestAdded?.();
    }
    setSubmittingInterests(false);
  }

  if (selectedCategories.length === 0) {
    return null;
  }

  return (
    <Button
      text="Save"
      btnStyle={styles.updatebtn}
      type="filled"
      fullWidth={true}
      disabled={submittingInterests}
      processing={submittingInterests}
      onPress={submitUserInterests}
    />
  );
}

const ModalHeader = memo(() => {
  const [userInterestList] = useInterestData(data => data.userInterestList);
  const [selectedCategories, { events }] = useInterestData(
    data => data.selectedCategories
  );
  const previousAvailableCount = useRef(-1);

  const availableSelections = useMemo(
    () =>
      10 - (selectedCategories.length ?? 0) - (userInterestList.length ?? 0),
    [selectedCategories, userInterestList]
  );

  useEffect(() => {
    // disable selection if available selection is = 0
    if (previousAvailableCount.current === 1 && availableSelections === 0) {
      events.emit('interest-selection-toggle', false);
    }

    // enable selection if available selection is > 0
    if (previousAvailableCount.current === 0 && availableSelections === 1) {
      events.emit('interest-selection-toggle', true);
    }
    previousAvailableCount.current = availableSelections;
  }, [availableSelections]);

  return (
    <View style={styles.modal_headerCt}>
      <Text style={styles.modal_headerText}>Add Interests</Text>
      <Text style={styles.heading_subText}>
        {availableSelections} selection Left
      </Text>
    </View>
  );
});

const UpdateInterestModal = (props: {
  showModal: boolean;
  onClose: () => void;
}) => {
  const [_, { setSearchQuery }] = useInterestData(data => null);

  const [showList, setShowList] = useState(false);

  return (
    <ReactNativeModal
      isVisible={props.showModal}
      onDismiss={props.onClose}
      onBackdropPress={props.onClose}
      onBackButtonPress={props.onClose}
      onSwipeComplete={() => props.onClose?.()}
      onModalShow={() => setShowList(true)}
      onModalHide={() => {
        setShowList(false);
        setSearchQuery('');
      }}
      swipeDirection="down"
      propagateSwipe
      useNativeDriverForBackdrop
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <View style={styles.addcategories}>
        <ModalHeader />
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
            onChangeText: debounce(setSearchQuery, 300)
          }}
          prefix={<MaterialCommunityIcons name="magnify" size={20} />}
        />
        {showList && (
          <>
            <ScrollView
              style={{
                marginHorizontal: -20,
                paddingHorizontal: 20,
                flex: 1
              }}
            >
              <TouchableOpacity activeOpacity={1} style={styles.allcategory}>
                <SelectedInterests />
                <AvailableInterestList />
              </TouchableOpacity>
            </ScrollView>
            <UpdateInterestButton onInterestAdded={() => props.onClose?.()} />
          </>
        )}
      </View>
    </ReactNativeModal>
  );
};

export default memo(UpdateInterestModal);

const styles = StyleSheet.create({
  modal_headerCt: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  heading_subText: {
    // fontFamily: 'Roboto-Medium',
    color: Black[600],
    fontSize: 14
  },
  modal_headerText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto-Medium'
  },
  allcategory: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },

  addcategories: {
    // marginTop: '8%',
    padding: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minHeight: '80%'
  },
  searchbox: {},
  updatebtn: {
    marginTop: 20
  }
});
