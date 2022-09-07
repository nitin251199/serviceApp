import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import {Switch} from 'react-native';
import {ServerURL} from '../API';

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const signOut = () => {
    dispatch({type: 'LOGOUT'});
  };

  const toggleTheme = () => {
    dispatch({
      type: 'SET_DARK_THEME',
      payload: !paperTheme.dark,
    });
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'column', marginTop: 15}}>
              <Avatar
                title={user?.name.substr(0, 1)}
                rounded
                source={{
                  uri: `${ServerURL}/application/${user?.userimage}`,
                }}
                size={80}
              />
              <View
                style={{marginTop: 10, marginLeft: 5, flexDirection: 'column'}}>
                <Title style={styles.title}>{user?.name}</Title>
                <Caption style={styles.caption}>{user?.email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="home" size={size} color={color} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="book-open" size={size} color={color} />
              )}
              label="My Bookings"
              onPress={() => {
                props.navigation.navigate('Bookings');
              }}
            />
            {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons name="ios-chatbubbles-sharp" size={size} />
              )}
              label="Chat"
              onPress={() => {
                props.navigation.navigate('Bookmark');
              }}
            /> */}
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons name="receipt" color={color} size={size} />
              )}
              label="Receipts"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
            {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="briefcase-search" size={size} />
              )}
              label="Search Jobs"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            /> */}
            {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => <Icon name="wallet" size={size} />}
              label="My Wallet"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            /> */}
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="account" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons name="notifications" color={color} size={size} />
              )}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text
                  style={{
                    color: paperTheme.colors.text,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Dark Theme
                </Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{fontFamily: 'Poppins-Medium'}}
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontFamily: 'Poppins-SemiBold',
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 25,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
