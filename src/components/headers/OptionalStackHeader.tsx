import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '~/src/utils/colors';

export enum OptionalFormStage {
  'INTERESTS_SELECTION',
  'ADD_PROFILE_IMAGE',
  'ADD_COVER_IMAGE',
  'ADD_BIO'
}

interface OptionalStackHeaderProps {
  formStage: OptionalFormStage;
  onSkip?: (event: GestureResponderEvent) => void;
  onProceed?: (event: GestureResponderEvent) => void;
  proceedLabel?: string;
  skipable?: boolean;
  disableSkip?: boolean;
  disableProceed?: boolean;
}

export function OptionalStackHeader({
  formStage,
  onProceed,
  onSkip,
  proceedLabel = 'NEXT',
  disableProceed = false,
  disableSkip = false,
  skipable = true
}: OptionalStackHeaderProps) {
  function getStyle(currentFormStage: OptionalFormStage) {
    return formStage >= currentFormStage ? styles.dotsY : styles.dotsG;
  }

  return (
    <View style={styles.headerView}>
      <TouchableOpacity
        disabled={disableSkip || !skipable}
        onPress={e => onSkip?.(e)}
      >
        <Text
          style={[styles.skipTxt, (disableSkip || !skipable) && { opacity: 0 }]}
        >
          SKIP
        </Text>
      </TouchableOpacity>
      <View style={styles.dotsView}>
        <View style={getStyle(OptionalFormStage.INTERESTS_SELECTION)} />
        <View style={getStyle(OptionalFormStage.ADD_PROFILE_IMAGE)} />
        <View style={getStyle(OptionalFormStage.ADD_COVER_IMAGE)} />
        <View style={getStyle(OptionalFormStage.ADD_BIO)} />
      </View>
      <TouchableOpacity disabled={disableProceed} onPress={e => onProceed?.(e)}>
        <Text style={[styles.nextTxt, disableProceed && styles.disableNext]}>
          {proceedLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row'
  },
  skipTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Gray200,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    padding: 5
  },
  dotsView: {
    flexDirection: 'row',
    width: 58,
    justifyContent: 'space-between'
  },
  dotsG: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.GrayBorder
  },
  dotsY: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.Primary
  },
  nextTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Secondary,
    fontStyle: 'normal',
    fontFamily: 'Roboto-Medium',
    padding: 5
  },
  disableNext: {
    color: Colors.Gray200,
    opacity: 0.6
  }
});
