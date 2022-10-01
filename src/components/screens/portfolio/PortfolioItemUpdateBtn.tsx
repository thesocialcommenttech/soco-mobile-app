import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button, { ButtonProps } from '../../theme/Button';

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
