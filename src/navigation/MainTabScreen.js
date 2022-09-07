import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/customerScreens/HomeScreen';
import BookingScreen from '../screens/customerScreens/BookingScreen';
import EnquireScreen from '../screens/EnquireScreen';
import {Color} from '../theme';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen';
import AltMapScreen from '../screens/AltMapScreen';

const HomeStack = createStackNavigator();
const BookingStack = createStackNavigator();
const MapStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    activeColor="#fff"
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
    <Tab.Screen
      name="Nearby"
      component={MapStackScreen}
      options={{
        tabBarLabel: 'Nearby',
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
        },
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="near-me" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Enquire"
      component={EnquireScreen}
      options={{
        tabBarLabel: 'Enquiry',
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
        },
        tabBarIcon: ({color}) => (
          <MaterialIcons name="support-agent" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

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
    <HomeStack.Screen
      name="Details"
      component={DetailScreen}
      options={{
        title: 'Details',
      }}
    />
    <HomeStack.Screen
      name="Nearby"
      component={MapScreen}
      options={{
        title: 'Nearby',
      }}
    />
    <HomeStack.Screen
      name="Location"
      component={AltMapScreen}
      options={{
        title: 'Location',
      }}
    />
  </HomeStack.Navigator>
);

const MapStackScreen = ({navigation}) => (
  <MapStack.Navigator
    screenOptions={{
      headerShown: false,
      // unmountOnBlur: true,
    }}>
    <MapStack.Screen
      name="NearbyMap"
      component={MapScreen}
      options={{
        title: 'Overview',
      }}
    />
    <MapStack.Screen
      name="Details"
      component={DetailScreen}
      options={{
        title: 'Details',
      }}
    />
  </MapStack.Navigator>
);

const BookingStackScreen = ({navigation}) => (
  <BookingStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <BookingStack.Screen
      name="Booking"
      component={BookingScreen}
      // options={{
      //   headerLeft: () => (
      //     <Icon.Button
      //       name="ios-menu"
      //       size={25}
      //       backgroundColor="#1f65ff"
      //       onPress={() => navigation.openDrawer()}></Icon.Button>
      //   ),
      // }}
    />
  </BookingStack.Navigator>
);
