import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/svg/login.svg';
import GoogleSVG from '../assets/svg/google.svg';
import FacebookSVG from '../assets/svg/facebook.svg';
import TwitterSVG from '../assets/svg/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {Color} from '../theme';
import {postData} from '../API';
import {errorToast, successToast} from '../components/Toasts';
import {Image} from 'react-native';

export default function LoginScreen({navigation, route}) {
  //   return <View></View>;
  const dispatch = useDispatch();

  const {roleId} = route.params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const signIn = async () => {
    setLoading(true);
    let body = {
      role_type: roleId,
      email: email,
      password: password,
    };
    const response = await postData('api/getLogin', body);
    if (response.success) {
      successToast('Login Successful !');
      setLoading(false);
      dispatch({
        type: 'SET_USER',
        payload: response.data,
      });
    } else {
      errorToast('Invalid Credentials', 'or User not found!');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/login.jpg')}
            style={{
              height: 250,
              width: 350,
              resizeMode: 'contain',
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontFamily: 'Poppins-SemiBold',
            color: Color.primary,
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          secure={!showPass}
          setSecure={setShowPass}
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {}}
        />

        <CustomButton
          loading={loading}
          label={'Login'}
          onPress={() => signIn()}
        />

        <Text
          style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: 30,
            fontFamily: 'Poppins-Medium',
          }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup', {roleId})}>
            <Text style={{color: '#026c7e', fontFamily: 'Poppins-Bold'}}>
              {' '}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
