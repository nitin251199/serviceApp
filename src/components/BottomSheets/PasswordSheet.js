import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {locationSheetStyles} from './LocationSheet';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Dimension} from '../../theme';
import {Button, HelperText, TextInput} from 'react-native-paper';

const {height, width} = Dimension.window;

export default function PasswordSheet(props) {
  const [show, setShow] = React.useState(false);

  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [oldPassError, setOldPassError] = React.useState(false);

  const [showOldPass, setShowOldPass] = React.useState(true);
  const [showNewPass, setShowNewPass] = React.useState(true);
  const [showConfirmPass, setShowConfirmPass] = React.useState(true);

  const [checkLoading, setCheckLoading] = React.useState(false);

  const checkOldPass = () => {
    setCheckLoading(true);
    setTimeout(() => {
      if (oldPassword != '1234') {
        setOldPassError(true);
        setCheckLoading(false);
      } else {
        setShow(true);
        setCheckLoading(false);
      }
    }, 1000);
  };

  const isValidPassword = () => {
    if (newPassword.length) return newPassword.length < 8;
  };

  const checkConfirmPass = () => {
    return confirmPassword.length && newPassword != confirmPassword;
  };

  const submitMobile = () => {
    props.onRequestClose();
  };

  const checkSubmitStatus = () => {
    if (newPassword.length > 0 && confirmPassword.length > 0) {
      return isValidPassword() || checkConfirmPass();
    }
    return true;
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Change Password</Text>
        <TouchableOpacity onPress={props.onRequestClose}>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color={Color.graylight}
          />
        </TouchableOpacity>
      </View>
      {show ? (
        <View style={{margin: 10}}>
          <Text style={styles.label}>Enter New Password</Text>
          <TextInput
            mode="outlined"
            secureTextEntry={showNewPass}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowNewPass(prev => !prev)}
              />
            }
            left={<TextInput.Icon icon="key" />}
            value={newPassword}
            autoFocus
            outlineColor={'#ccc'}
            error={isValidPassword()}
            onChangeText={text => {
              setNewPassword(text);
            }}
            activeOutlineColor={Color.primary}
            style={styles.input}
            label="New Password"
          />
          <HelperText
            padding="none"
            type="error"
            visible={isValidPassword()}
            style={{display: isValidPassword() ? 'flex' : 'none'}}>
            Password must be atleast of 8 digits !
          </HelperText>
          <TextInput
            mode="outlined"
            value={confirmPassword}
            secureTextEntry={showConfirmPass}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowConfirmPass(prev => !prev)}
              />
            }
            left={<TextInput.Icon icon="key" />}
            outlineColor={'#ccc'}
            error={checkConfirmPass()}
            onChangeText={text => setConfirmPassword(text)}
            activeOutlineColor={Color.primary}
            style={styles.input}
            label="Confirm Password"
          />
          <HelperText
            padding="none"
            type="error"
            visible={checkConfirmPass()}
            style={{display: checkConfirmPass() ? 'flex' : 'none'}}>
            Passwords don't match !
          </HelperText>
          <Button
            onPress={() => submitMobile()}
            // loading={loading}
            disabled={checkSubmitStatus()}
            color={Color.primary}
            style={{marginTop: 20}}
            contentStyle={{
              height: 55,
              alignItems: 'center',
            }}
            mode="contained">
            Verify
          </Button>
        </View>
      ) : (
        <View style={{margin: 10}}>
          <Text style={styles.label}>Enter your old password</Text>
          <TextInput
            mode="outlined"
            value={oldPassword}
            secureTextEntry={showOldPass}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowOldPass(prev => !prev)}
              />
            }
            autoFocus
            outlineColor={'#ccc'}
            error={oldPassError}
            onChangeText={text => {
              setOldPassword(text);
              setOldPassError(false);
            }}
            activeOutlineColor={Color.primary}
            style={styles.input}
            left={<TextInput.Icon icon="key" />}
            label="Old Password"
          />
          <HelperText
            padding="none"
            type="error"
            visible={oldPassError}
            style={{display: oldPassError ? 'flex' : 'none'}}>
            Invalid Password !
          </HelperText>
          <Button
            // icon="refresh"
            onPress={() => checkOldPass()}
            loading={checkLoading}
            disabled={!oldPassword.length}
            color={Color.primary}
            style={{color: Color.primary, marginTop: 10}}
            contentStyle={{
              height: 55,
              alignItems: 'center',
            }}
            mode="contained">
            Verify
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Color.gray,
    // margin: 10,
  },
  input: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 10,
  },
  ...locationSheetStyles,
});
