import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import React, { useRef, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UPIIconImage from '../../assets/images/icons/UPI.png';
import Button from '../theme/Button';
import { Black, Green, Red } from '~/src/utils/colors';
import Maskdata from 'maskdata';
import {
  deleteWithdrawDestination,
  setWithdrawAccountAsDefault
} from '~/src/utils/services/wallet_services/getWallet.service';
import { WithdrawDestination } from '~/src/utils/typings/wallet_interfaces/getWallet.interface';
import {
  BankWithdrawDestData,
  UPIWithdrawDestData
} from '~/src/utils/typings/wallet_interfaces/addWithdrawAccount';
import Bottomsheet, { DropdownOption } from '../bottomsheet/Bottomsheet';

export default function WithdrawAccount({
  account,
  onDelete,
  showMoreOpts = true,
  style,
  onDefaultSet
}: {
  account: WithdrawDestination;
  showMoreOpts?: boolean;
  onDelete: () => void;
  onDefaultSet: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const accountId = useRef(
    account.destination_type === 'bank'
      ? (account.detail as BankWithdrawDestData).bank_account_no
      : (account.detail as UPIWithdrawDestData).upi_id
  ).current;

  const deleteDestination = async () => {
    setShowOptions(false);
    setIsDeleting(true);
    const result = await deleteWithdrawDestination(account._id);
    if (result.data.success) {
      onDelete?.();
    }
  };

  const setAsDefault = async () => {
    setShowOptions(false);
    const result = await setWithdrawAccountAsDefault(account._id);
    if (result.data.success) {
      onDefaultSet?.();
    }
  };

  return (
    <>
      <View style={[styles.container, isDeleting && styles.deleting, style]}>
        <View style={styles.body}>
          <View style={styles.iconCt}>
            {account.destination_type === 'bank' ? (
              <MaterialCommunityIcons
                name="bank"
                size={20}
                color={Black[600]}
              />
            ) : (
              <Image
                style={styles.image}
                resizeMode="contain"
                source={UPIIconImage}
              />
            )}
          </View>
          <View style={styles.accountInfoCt}>
            <Text style={styles.detailtext}>
              {Maskdata.maskPassword(accountId, {
                maskWith: 'X',
                unmaskedStartCharacters: accountId.length * 0.6
              })}
            </Text>
            {account.default && <Text style={styles.defaultTag}>Default</Text>}
          </View>
        </View>
        {showMoreOpts && (
          <Button
            size="xs"
            onPress={() => setShowOptions(true)}
            processing={isDeleting}
            disabled={isDeleting}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={18}
              color={Black[400]}
            />
          </Button>
        )}
      </View>
      <Bottomsheet visible={showOptions} onClose={() => setShowOptions(false)}>
        {!account.default && (
          <DropdownOption
            icon="bank-outline"
            label="Set as Default"
            onOptionPress={setAsDefault}
          />
        )}
        <DropdownOption
          icon="delete-outline"
          label="Delete Account"
          onOptionPress={deleteDestination}
        />
      </Bottomsheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleting: { backgroundColor: Black[400], opacity: 0.5 },
  iconCt: {
    width: 60,
    justifyContent: 'center'
  },
  body: {
    flexDirection: 'row'
  },
  accountInfoCt: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 20
  },
  detailtext: {
    // fontSize: 16,
    color: 'black',
    marginRight: 10,
    flexShrink: 1,
    flexWrap: 'wrap'
  },
  image: {
    width: 40
    // marginLeft: '2%',
    // marginTop: '4%'
  },
  defaultTag: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Medium',
    fontSize: 10,
    marginTop: 2,
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 8,
    color: Green.primary,
    letterSpacing: 0.2,
    backgroundColor: Green[100],
    borderWidth: 1,
    borderColor: Green[200]
  }
});
