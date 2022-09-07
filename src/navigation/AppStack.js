import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerContent} from '../screens/DrawerContent';

import MainTabScreen from './MainTabScreen';
import SupportScreen from '../screens/SupportScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ProfileScreen from '../screens/customerScreens/ProfileScreen';
import WorkerProfileScreen from '../screens/workerScreens/ProfileScreen';
import AppHeader from './AppHeader';
import {useSelector} from 'react-redux';
import WorkerTabScreen from './WorkerTabScreen';

const Drawer = createDrawerNavigator();

const CustomerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        header: props => <AppHeader {...props} />,
      }}>
      <Drawer.Screen name="Home" component={MainTabScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Bookmark" component={BookmarkScreen} />
    </Drawer.Navigator>
  );
};

const workerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        header: props => <AppHeader {...props} />,
      }}>
      <Drawer.Screen name="Home" component={WorkerTabScreen} />
      <Drawer.Screen name="Profile" component={WorkerProfileScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Bookmark" component={BookmarkScreen} />
    </Drawer.Navigator>
  );
};

export default function AppStack() {
  const user = useSelector(state => state.user);
  if (user.role === '1') {
    return workerStack();
  }
  return CustomerStack();
}
