import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode, useState } from 'react';
import Button, { ButtonProps } from '~/src/components/theme/Button';
import MetaDetailModal from './ProjectMetaDetailModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';
import { Blue } from '~/src/utils/colors';

interface MetaDetailBtnProps {
  buttonProps: ButtonProps;
  title: string;
  value: string | ReactNode;
}

export default function ProjectMetaDetailButton(props: MetaDetailBtnProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <MetaDetailModal
        show={show}
        onClose={() => setShow(false)}
        title={props.title}
        value={props.value}
      />
      <Button
        type="filled"
        fullWidth
        highlightColor={Color(Blue[50]).lighten(-0.02).string()}
        {...props.buttonProps}
        onPress={() => setShow(true)}
        btnStyle={StyleSheet.flatten([
          styles.metaDetail_Btn,
          props.buttonProps.btnStyle
        ])}
      >
        <View style={styles.metaDetail_BtnContentCt}>
          <Text style={styles.metaDetail_BtnText}>{props.title}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={16}
            color={Color(Blue.primary).fade(0.7).string()}
          />
        </View>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  metaDetail_Btn: {
    alignItems: 'stretch',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'white',
    borderRadius: 0,
    backgroundColor: Blue[50]
  },
  metaDetail_BtnContentCt: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaDetail_BtnText: { color: 'black', fontSize: 14 }
});
