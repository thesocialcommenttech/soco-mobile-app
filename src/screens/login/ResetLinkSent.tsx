import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '~/src/components/theme/Button';
import { Black, Blue } from '~/src/utils/colors';
import { Link, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IAuthStackScreenProps } from '~/src/types/navigation/auth';

function ResetPasswordLinkScreen() {
  const navigation = useNavigation<IAuthStackScreenProps['navigation']>();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <MaterialCommunityIcons
          name="email-plus"
          size={70}
          color={Blue.primary}
          style={styles.mailicon}
        />
        <Text style={styles.title}>Check your mail</Text>
        <Text style={styles.subtitle}>
          We have sent a password reset link to your email.
        </Text>
        <Button
          text={"Skip, I'll confirm later"}
          btnStyle={{ alignSelf: 'center' }}
          onPress={() => navigation.reset({ routes: [{ name: 'Login' }] })}
        />
      </View>
      <Text style={styles.issueMessage}>
        Did not receive the email? Check in your spam, or{' '}
        <Link to={{ screen: 'ForgotPassword' }} style={{ color: Blue.primary }}>
          try again
        </Link>
      </Text>
    </View>
  );
}

export default ResetPasswordLinkScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mailicon: {
    backgroundColor: Blue[50],
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 100
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 22,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: Black[600],
    marginBottom: 30,
    textAlign: 'center'
  },
  issueMessage: { fontSize: 14, color: Black[600], textAlign: 'center' }
});
