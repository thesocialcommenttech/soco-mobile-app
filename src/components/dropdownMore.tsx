import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../utils/colors';
import Bottomsheet, { DropdownOption } from './bottomsheet/Bottomsheet';

const optionsList = [
  {
    label: 'Edit',
    key: 'edit',
    icon: 'pencil'
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: 'delete-outline'
  }
];

function DropdownMore({
  onDelete,
  onEdit
}: {
  onDelete: () => void;
  onEdit: () => void;
}) {
  const [visible, setVisible] = useState(false);

  function onOptionPress(optionKey: string) {
    switch (optionKey) {
      case 'edit':
        onEdit?.();
        break;

      case 'delete':
        onDelete?.();
        break;
    }
  }

  return (
    <>
      <TouchableHighlight
        onPress={() => setVisible(true)}
        underlayColor={Colors.Gray100}
        style={styles.dropMoreBtn}
      >
        <MaterialIcon name="more-vert" size={20} color={Colors.Gray600} />
      </TouchableHighlight>
      <Bottomsheet visible={visible} onClose={() => setVisible(false)}>
        {optionsList.map((item, i) => (
          <DropdownOption
            key={'draftOption' + item.key + i}
            optionKey={item.key}
            label={item.label}
            icon={item.icon}
            onOptionPress={() => {
              onOptionPress(item.key);
            }}
          />
        ))}
      </Bottomsheet>
    </>
  );
}

const styles = StyleSheet.create({
  dropMoreBtn: {
    padding: 5,
    borderRadius: 100
  }
});

export default DropdownMore;
