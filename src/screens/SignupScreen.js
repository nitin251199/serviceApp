import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../assets/svg/registration.svg';
import GoogleSVG from '../assets/svg/google.svg';
import FacebookSVG from '../assets/svg/facebook.svg';
import TwitterSVG from '../assets/svg/twitter.svg';
import CustomButton from '../components/CustomButton';
import {Color} from '../theme';
import {Image} from 'react-native';
import {errorToast, successToast} from '../components/Toasts';
import {postData} from '../API';
import {isEmail, isEmpty, isValidPassword} from '../utils/checks';

const SignupScreen = ({navigation, route}) => {
  //   const [date, setDate] = useState(new Date());

  const {roleId} = route.params;

  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async () => {
    let body = {
      role_type: roleId,
      email: email,
      password: password,
      name: name,
    };
    if (isEmpty(name)) return errorToast('Name should not be empty');

    if (isEmail(email)) {
      return errorToast('Please enter a valid Email Id');
    }
    if (isValidPassword(password)) {
      return errorToast('Passwords should be atleast', '6 characters long!');
    }
    if (confirmPassword !== password)
      return errorToast('Passwords did not matched!');

    let response = await postData('api/getRegister', body);

    if (response.success) {
      if (response.msg == 'Already Exist')
        return errorToast('User Already Exists');
      successToast('Registration Successfull');
      return navigation.goBack();
    }
    return errorToast('Something Went Wrong!');
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/registration.jpg')}
            style={{
              height: 200,
              width: 300,
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 28,
            color: Color.primary,
            marginBottom: 15,
          }}>
          Register
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: 20,
            fontFamily: 'Poppins-Medium',
          }}>
          Or, register with email ...
        </Text>

        <InputField
          label={'Full Name'}
          onChangeText={text => setName(text)}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />

        <InputField
          label={'Email ID'}
          onChangeText={text => setEmail(text)}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          onChangeText={text => setPassword(text)}
          secure={!showPass}
          setSecure={setShowPass}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />

        <InputField
          label={'Confirm Password'}
          onChangeText={text => setConfirmPassword(text)}
          secure={!showCPass}
          setSecure={setShowCPass}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />

        {/* <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}

        <CustomButton label={'Register'} onPress={() => signUp()} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: Color.primary, fontFamily: 'Poppins-Bold'}}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
