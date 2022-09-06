import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import Upi from './upi';
import Bank from './bank';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import { InputError, SelectInput } from '~/src/components/theme/Input';
import Button from '~/src/components/theme/Button';
import { useFormik } from 'formik';
import { bool, object, string } from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Red, Yellow } from '~/src/utils/colors';
import { addWithdrawAccount } from '~/src/utils/services/wallet_services/addWithdrawAccount.service';
import {
  WithdrawDestinationData,
  WithdrawDestinationType
} from '~/src/utils/typings/wallet_interfaces/addWithdrawAccount';

export default function AddWithdrawAccount() {
  const [accountType, setAccountType] =
    useState<WithdrawDestinationType>('upi');

  const agreement = useRef(
    bool()
      .default(false)
      .oneOf([true], 'This cannot be left unchecked')
      .required('This cannot be left unchecked')
  ).current;

  async function submitAccount(
    type: 'upi' | 'bank',
    data: WithdrawDestinationData
  ) {
    const result = await addWithdrawAccount(type, data);

    if (result.data.success) {
    }
    currentTypeFormik.setSubmitting(false);
  }

  const bankFormik = useFormik({
    initialValues: {
      holder_name: '',
      bank_account_no: '',
      bank_ifsc: '',
      agreement: false
    },
    validationSchema: object({
      holder_name: string().trim().required('Account Holder Name is Required'),
      bank_account_no: string().required('Bank Account Number is required'),
      bank_ifsc: string().required('Bank IFSC is required'),
      agreement
    }),
    onSubmit: value => submitAccount('bank', value)
  });

  const upiFormik = useFormik({
    initialValues: { upi_id: '', agreement: false },
    validationSchema: object({
      upi_id: string()
        .trim()
        .matches(/^[\w.-]+@[\w.-]+$/, 'UPI Id is not valid')
        .required('UPI Id is Required'),
      agreement
    }),
    onSubmit: value => submitAccount('upi', value)
  });

  const currentTypeFormik = useMemo(
    () => (accountType === 'upi' ? upiFormik : bankFormik),
    [accountType, upiFormik, bankFormik]
  );

  return (
    <>
      <SettingScreenHeader title="Add Account" />
      <ScrollView>
        <View style={styles.container}>
          <SelectInput
            label="Account Type"
            optionListHeaderTitle="Select Account Type"
            inputProp={{ value: accountType }}
            onValueChange={type => setAccountType(type as any)}
            selectOptions={{
              upi: 'UPI',
              bank: 'Bank'
            }}
          />
          <SectionHeader label="Account Details" style={{ marginTop: 30 }} />
          <View style={{ marginTop: 20 }}>
            {accountType === 'upi' ? (
              <Upi formContorler={upiFormik} />
            ) : (
              <Bank formContorler={bankFormik} />
            )}
          </View>

          <View
            style={[
              styles.agreementCt,
              currentTypeFormik.errors.agreement && styles.agreemenError
            ]}
          >
            <Button
              btnStyle={{
                marginTop: -8,
                marginLeft: -5,
                paddingHorizontal: 10,
                backgroundColor: Yellow[100]
              }}
              size="sm"
              type="filled"
              onPress={() =>
                currentTypeFormik.setFieldValue(
                  'agreement',
                  !currentTypeFormik.values.agreement
                )
              }
            >
              <MaterialCommunityIcons
                name={
                  currentTypeFormik.values.agreement
                    ? 'checkbox-marked-outline'
                    : 'checkbox-blank-outline'
                }
                color="black"
                size={24}
              />
            </Button>
            <Text
              onPress={() =>
                currentTypeFormik.setFieldValue(
                  'agreement',
                  !currentTypeFormik.values.agreement
                )
              }
              style={styles.agreementText}
            >
              Check your bank Account/UPI details twice, carefully before adding
              it. For any mistakes in giving the details of the account you are
              solely responsible.
            </Text>
          </View>
          {currentTypeFormik.errors.agreement && (
            <InputError error={upiFormik.errors.agreement} />
          )}
          <Button
            type="filled"
            fullWidth
            btnStyle={{ marginTop: 20 }}
            text="Add Account"
            disabled={upiFormik.isSubmitting || bankFormik.isSubmitting}
            processing={upiFormik.isSubmitting || bankFormik.isSubmitting}
            onPress={() => {
              currentTypeFormik.submitForm();
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  agreementCt: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: Yellow[100],
    borderRadius: 5,
    padding: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  agreemenError: {
    borderColor: Red.primary
  },
  agreementText: {
    marginLeft: 5,
    fontSize: 15.5,
    flexShrink: 1,
    color: 'black',
    lineHeight: 20
  }
});
