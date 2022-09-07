import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Color} from '../theme';
import HomeScreen from '../screens/workerScreens/HomeScreen';
import BookingScreen from '../screens/workerScreens/BookingScreen';

const HomeStack = createStackNavigator();
const BookingStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const WorkerTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#fff"
      shifting
      sceneAnimationEnabled
      barStyle={{backgroundColor: Color.primary, margin: 0}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Regular',
          },
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingStackScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Regular',
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="book-open" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default WorkerTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
      unmountOnBlur: true,
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home',
      }}
    />
  </HomeStack.Navigator>
);

const BookingStackScreen = ({navigation}) => (
  <BookingStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <BookingStack.Screen name="Booking" component={BookingScreen} />
  </BookingStack.Navigator>
);
