import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import {Avatar} from '@rneui/themed';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../../theme';
import ProfileModal from '../../components/Modals/ProfileModal';
import {useSelector} from 'react-redux';
import {ServerURL} from '../../API';

// import Share from 'react-native-share';

// import files from '../assets/filesBase64';

const ProfileScreen = () => {
  const [visible, setVisible] = React.useState(false);
  const user = useSelector(state => state.user);

  const myCustomShare = async () => {
    const shareOptions = {
      message: 'Book',
      url: files.appLogo,
      // urls: [files.image1, files.image2]
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              size={80}
              rounded
              source={{
                uri: `${ServerURL}/application/${user?.userimage}`,
              }}
              title={user?.name.substr(0, 1)}
              containerStyle={{backgroundColor: Color.primary}}></Avatar>
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                {user?.name}
              </Title>
              {/* <Caption style={styles.caption}>@j_doe</Caption> */}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              padding: 10,
            }}>
            <Icon name="square-edit-outline" size={30} color={Color.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={styles.rowText}>Kolkata, India</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={styles.rowText}>Add phone</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={styles.rowText}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#dddddd',
              borderRightWidth: 1,
            },
          ]}>
          <Title style={{fontFamily: 'Poppins-Medium'}}>₹ 140.50</Title>
          <Caption style={{fontFamily: 'Poppins-Medium'}}>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{fontFamily: 'Poppins-Medium'}}>12</Title>
          <Caption style={{fontFamily: 'Poppins-Medium'}}>Bookings</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart" color={Color.primary} size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={Color.primary} size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
        // onPress={myCustomShare}
        >
          <View style={styles.menuItem}>
            <Icon name="share" color={Color.primary} size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check" color={Color.primary} size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="cog" color={Color.primary} size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
      {
        <ProfileModal
          visible={visible}
          user={user}
          onRequestClose={() => setVisible(false)}
        />
      }
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  caption: {
    fontSize: 14,
    // lineHeight: 14,
    // fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 10,
  },
  rowText: {
    color: '#777777',
    marginLeft: 20,
    fontFamily: 'Poppins-Medium',
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins-Medium',
  },
});
