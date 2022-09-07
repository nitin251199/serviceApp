import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {locationSheetStyles} from './LocationSheet';
import {Color, Dimension} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, HelperText, TextInput} from 'react-native-paper';
import OTPTextView from 'react-native-otp-textinput';

const {height, width} = Dimension.window;

export default function ChangeMobileSheet(props) {
  const [show, setShow] = React.useState(false);
  const [mobileNo, setMobileNo] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpError, setOtpError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const hasErrors = () => {
    if (mobileNo.length >= 10) return mobileNo.length != 10;
  };

  const submitMobile = () => {
    setLoading(true);
    setTimeout(() => {
      if (otp != '0000') {
        setLoading(false);
        return setOtpError(true);
      }
      props.setMobileNo(mobileNo);
      props.onRequestClose();
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Change Mobile Number</Text>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.label}>OTP sent to +91-{mobileNo}</Text>
            <TouchableOpacity
              onPress={() => {
                setShow(false);
              }}>
              <Text
                style={{
                  ...styles.label,
                  color: Color.primary,
                  fontSize: 14,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Change ?
              </Text>
            </TouchableOpacity>
          </View>
          <OTPTextView
            handleTextChange={text => {
              setOtp(text);
              setOtpError(false);
            }}
            containerStyle={styles.textInputContainer}
            textInputStyle={{
              ...styles.roundedTextInput,
              borderColor: otpError ? Color.red : Color.primary,
            }}
            inputCount={4}
            offTintColor={otpError ? Color.error : Color.graylight}
            tintColor={otpError ? Color.error : Color.primary}
          />
          <HelperText
            padding="none"
            type="error"
            visible={otpError}
            style={{display: otpError ? 'flex' : 'none'}}>
            Invalid OTP !
          </HelperText>
          <Button
            onPress={() => submitMobile()}
            loading={loading}
            style={{backgroundColor: Color.primary, marginTop: 20}}
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
          <Text style={styles.label}>Enter your new mobile number</Text>
          <TextInput
            mode="outlined"
            value={mobileNo}
            autoFocus
            outlineColor={'#ccc'}
            error={hasErrors()}
            onChangeText={text => setMobileNo(text)}
            activeOutlineColor={Color.primary}
            style={styles.input}
            left={<TextInput.Icon icon="phone" />}
            keyboardType="number-pad"
            label="Mobile Number"
          />
          <HelperText
            padding="none"
            type="error"
            visible={hasErrors()}
            style={{display: hasErrors() ? 'flex' : 'none'}}>
            Mobile Number should be 10 digits long!
          </HelperText>
          <Button
            // icon="refresh"
            onPress={() => setShow(true)}
            // loading={loading}
            disabled={mobileNo.length < 10 || hasErrors()}
            color={Color.primary}
            style={{color: Color.primary, marginTop: 10}}
            contentStyle={{
              height: 55,
              alignItems: 'center',
            }}
            mode="contained">
            Send OTP
          </Button>
        </View>
      )}
    </>
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
    fontSize: 18,
    marginTop: 10,
  },
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderBottomWidth: 2,
  },
  textInputContainer: {
    marginTop: 10,
  },
  ...locationSheetStyles,
});
