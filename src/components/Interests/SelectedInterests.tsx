import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useInterestData } from '~/src/state/InterestSelectorState';
import CategoryBox from '../categoryBox';

export function SelectedInterests() {
  const [selectedCategories, { unselectInterest }] = useInterestData(
    data => data.selectedCategories
  );

  if (selectedCategories.length === 0) {
    return null;
  }

  return (
    <>
      {selectedCategories.map((interest, i) => (
        <CategoryBox
          key={interest._id}
          text={interest.category}
          cancelable={true}
          selected={true}
          onCancel={() => {
            unselectInterest(interest._id);
          }}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  selectedCategories: {
    // marginTop: '6%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
