import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';

const ImageInputWithLabel = ({ ...props }) => {
  const [filePath, setFilePath] = useState();

  useEffect(() => {
    setFilePath(props.uri);
  }, [props.uri]);

  return (
    <View style={styles.mainview}>
      <View style={styles.labelBox}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={styles.descriptionview}>
        {filePath
          ? [
              <View style={styles.imageview}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: filePath
                  }}
                />
              </View>
            ]
          : [
              <View style={styles.noimageview}>
                <Text style={styles.txtcolor}>Hello</Text>
              </View>
            ]}

        <TouchableWithoutFeedback>
          <>
            {filePath
              ? [
                  <TouchableWithoutFeedback
                    onPress={() => {
                      props.func();
                    }}
                  >
                    <Text style={styles.imagebtn}>Change Image</Text>
                  </TouchableWithoutFeedback>
                ]
              : [
                  <TouchableWithoutFeedback
                    onPress={() => {
                      props.func();
                    }}
                  >
                    <Text style={styles.imagebtn}>Choose Image</Text>
                  </TouchableWithoutFeedback>
                ]}
          </>
        </TouchableWithoutFeedback>
      </View>
      {props.errorTxt && <Text style={styles.error}>{props.errorTxt}</Text>}
      {/* <TextInput
        label={<Text style={{ ...styles.label }}>{props.label}</Text>}
        style={[styles.input, props.inputStyle]}
        // underlineColor='transparent'
      />
      {props.errorTxt && <Text style={styles.error}>{props.errorTxt}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    fontWeight: '800',
    lineHeight: 14,
    fontStyle: 'normal',
    color: '#000',
    padding: '2%',
    marginBottom: '-1%',
    textTransform: 'uppercase'
  },
  labelBox: {
    backgroundColor: 'white',
    // flexDirection: 'row'
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: '-3%',
    zIndex: 999,
    paddingLeft: 4,
    paddingRight: 4
  },
  input: {
    width: '100%',
    // height: 51,
    color: '#000',
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center'
    // borderWidth: 1,
    // borderColor: '#DCDCDC',
    // borderRadius: 5
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: '#EE0000',
    marginTop: '2%'
  },
  tinyLogo: {
    width: 170,
    height: 90,
    borderRadius: 5
  },
  mainview: {
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: '7%'
  },
  descriptionview: {
    flexDirection: 'row'
  },
  imageview: {
    marginLeft: '2%',
    marginBottom: '2.5%'
  },
  imagebtn: {
    color: '#7D7987',
    fontWeight: '600',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: '2%',
    marginLeft: '12%'
  },
  noimageview: {
    padding: '9%'
  },
  txtcolor: {
    color: 'white'
  }
});

export default ImageInputWithLabel;
