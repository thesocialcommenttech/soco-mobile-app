import { StyleSheet, Text } from 'react-native';
import React from 'react';
import Bottomsheet, { DropdownOption } from '../../bottomsheet/Bottomsheet';

export default function PortfolioDropdown(props: {
  visible: boolean;
  username: string;
  navigation: {
    navigate: (screen: 'PortfolioTheme', params: { uri: string }) => void;
  };
  onClose: () => void;
}) {
  const showTheme = theme => {
    props.onClose?.();
    props.navigation.navigate('PortfolioTheme', {
      uri: `https://portfolio.soco.co.in/${props.username}/portfolio/${theme}`
    });
  };

  return (
    <Bottomsheet visible={props.visible} onClose={() => props.onClose?.()}>
      <Text
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20
        }}
      >
        Select a theme for your portfolio
      </Text>
      <DropdownOption
        optionKey="ProfileDark"
        label="Dark Theme"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="DesignerProfile1"
        label="Designer Theme"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="DesignerProfile2"
        label="Designer Theme 2"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="ProfileGradient"
        label="Gradient Theme"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Minimal"
        label="Minimal"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="NavyBlue"
        label="Navy Blue"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Austere"
        label="Austere"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Spare"
        label="Spare"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Stealth"
        label="Stealth"
        onOptionPress={showTheme}
      />
      <DropdownOption optionKey="Edge" label="Edge" onOptionPress={showTheme} />
      <DropdownOption
        optionKey="Winsome"
        label="Winsome"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Depiction"
        label="Depiction"
        onOptionPress={showTheme}
      />
      <DropdownOption optionKey="Blue" label="Blue" onOptionPress={showTheme} />
      <DropdownOption
        optionKey="Fragment"
        label="Fragment"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Butterfly"
        label="Butterfly"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Serenity"
        label="Serenity"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Compact"
        label="Compact"
        onOptionPress={showTheme}
      />
      <DropdownOption
        optionKey="Courteous"
        label="Courteous"
        onOptionPress={showTheme}
      />
    </Bottomsheet>
  );
}

const styles = StyleSheet.create({});
