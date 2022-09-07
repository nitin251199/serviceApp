import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {Color, Dimension} from '../theme';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginTypeScreen({navigation}) {
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={[Color.primary, `${Color.primary}00`]}>
      <Text style={styles.text}>Welcome to Unified Service Rider App</Text>
      <Image source={require('../assets/loginType.png')} style={styles.image} />
      <Button
        onPress={() => navigation.navigate('Login', {roleId: 2})}
        color={Color.primary}
        style={{...styles.button, marginTop: 50}}
        contentStyle={{
          height: 55,
          alignItems: 'center',
        }}
        mode="contained">
        You Are a Customer
      </Button>
      <Button
        onPress={() => navigation.navigate('Login', {roleId: 1})}
        color={Color.primary}
        style={styles.button}
        contentStyle={{
          height: 55,
          alignItems: 'center',
        }}
        mode="contained">
        You are a Service Provider
      </Button>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 30,
  },
  text: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    color: Color.white,
    paddingVertical: 15,
    textAlign: 'center',
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimension.window.height,
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    width: Dimension.window.width * 0.8,
    elevation: 10,
  },
});
