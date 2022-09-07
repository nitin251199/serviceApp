import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Color, Dimension} from '../../theme';
import InputField from '../InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Avatar} from '@rneui/themed';
import ProfileSheet from '../BottomSheets/ProfileSheet';
import {successToast} from '../Toasts';
import {ServerURL} from '../../API';

const {width, height} = Dimension.window;

export default function ProfileModal(props) {
  const [visible, setVisible] = React.useState(false);
  const [view, setView] = React.useState('');

  const [name, setName] = React.useState(props.user?.name);
  const [mobileNo, setMobileNo] = React.useState('1234567890');
  const [location, setLocation] = React.useState('Bangalore, Karnataka');
  const [image, setImage] = React.useState(props.user?.userimage);

  const saveChanges = () => {
    props.onRequestClose();
    successToast('Profile Updated Successfully');
  };

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={props.onRequestClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor: '#fff'}]}>
          <View>
            <Text style={[styles.modalText]}>Edit Profile</Text>
          </View>
          <View style={{width: width * 0.75, alignItems: 'center'}}>
            <Avatar
              size={80}
              rounded
              source={{uri: `${ServerURL}/application/${image}`}}
              onPress={() => {
                setView('profilepic');
                setVisible(true);
              }}
              title={props.user?.name.substr(0, 1)}
              containerStyle={{
                backgroundColor: Color.primary,
                marginBottom: 25,
              }}>
              <Avatar.Accessory
                onPress={() => {
                  setView('profilepic');
                  setVisible(true);
                }}
                size={30}
                style={{backgroundColor: Color.primary}}
              />
            </Avatar>
            <InputField
              label={'Name'}
              value={name}
              onChangeText={setName}
              icon={
                <MaterialIcons
                  name="person"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
            />
            <InputField
              label={'Mobile Number'}
              value={mobileNo}
              editable={false}
              onChangeText={setMobileNo}
              icon={
                <MaterialIcons
                  name="phone-iphone"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              fieldButtonLabel={'Change'}
              fieldButtonFunction={() => {
                setView('mobileNo');
                setVisible(true);
              }}
            />
            <Pressable
              onPress={() => {
                setView('location');
                setVisible(true);
              }}
              style={styles.locationContainer}>
              <Text style={styles.locationText}>{location}</Text>
              <MaterialIcons name="gps-fixed" size={20} color="#666" />
            </Pressable>
            <Pressable
              onPress={() => {
                setView('password');
                setVisible(true);
              }}
              style={styles.passwordContainer}>
              <Text style={styles.passwordText}>Change Password ?</Text>
            </Pressable>
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={() => props.onRequestClose()}
                style={{
                  ...styles.button,
                  backgroundColor: '#fff',
                  marginRight: 15,
                }}>
                <Text style={{...styles.buttonText, color: Color.primary}}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => saveChanges()}
                style={{...styles.button, backgroundColor: Color.primary}}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <ProfileSheet
        visible={visible}
        mobileNo={mobileNo}
        location={location}
        setMobileNo={setMobileNo}
        setLocation={setLocation}
        setImage={setImage}
        view={view}
        onRequestClose={() => setVisible(false)}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    // width: width * 0.85,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    width: width * 0.5,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 15,
  },
  locationContainer: {
    width: width * 0.77,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    // color: '#999',
  },
  passwordContainer: {
    width: width * 0.77,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  passwordText: {
    fontFamily: 'Poppins-SemiBold',
    color: Color.primary,
  },
  buttonContainer: {
    width: width * 0.77,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
    // width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    color: Color.white,
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
});
