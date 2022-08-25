import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native';
import React, { ReactElement } from 'react';
import { Colors } from '~/src/utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function DropdownOption({
  optionKey,
  onOptionPress,
  label,
  icon
}: {
  optionKey: string;
  label: string;
  icon?: string;
  onOptionPress: (optionKey: string) => void;
}) {
  return (
    <TouchableHighlight
      underlayColor={Colors.Gray100}
      style={styles.item}
      onPress={() => onOptionPress?.(optionKey)}
    >
      <>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            style={styles.optionIcon}
            size={16}
          />
        )}
        <Text style={styles.optionLabel}>{label}</Text>
      </>
    </TouchableHighlight>
  );
}

type Props = {
  visible: boolean;
  children: ReactElement | ReactElement[];
  onClose: () => void;
  bodyStyle?: StyleProp<ViewStyle>;
};

export default function Bottomsheet({
  visible,
  children,
  onClose,
  bodyStyle
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Background Overlay */}
      <TouchableWithoutFeedback onPress={() => onClose?.()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      {/* Options List */}
      <ScrollView style={[styles.dropdown, bodyStyle]}>{children}</ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  optionLabel: {
    color: Colors.Black,
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  optionIcon: {
    paddingRight: 10,
    color: 'black'
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    zIndex: 999,
    height: 'auto',
    paddingVertical: 15,
    bottom: 0
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)'
  }
});
