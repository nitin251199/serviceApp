import {
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

export const getLocation = async () => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

  Geolocation.getCurrentPosition(position => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      console.log('region', region);
      //   return region;
    },
    error => {
      console.log(error);
    },
    {enableHighAccuracy: true, timeout: 200000, maximumAge: 5000},
  );
};

