import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import {Searchbar, Button, TextInput} from 'react-native-paper';
import {Color, Dimension} from '../../theme';
import {locationSheetStyles} from './LocationSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChangeMobileSheet from './ChangeMobileSheet';
import PasswordSheet from './PasswordSheet';
import ProfilePicSheet from './ProfilePicSheet';

export default function ProfileSheet(props) {
  const modalView = () => {
    switch (props.view) {
      case 'profilepic':
        return (
          <ProfilePicSheet
            onRequestClose={props.onRequestClose}
            setImage={props.setImage}
          />
        );

      case 'password':
        return <PasswordSheet onRequestClose={props.onRequestClose} />;
      case 'mobileNo':
        return (
          <ChangeMobileSheet
            onRequestClose={props.onRequestClose}
            setMobileNo={props.setMobileNo}
          />
        );
      case 'location':
        return (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.text}>Search Location</Text>
              <TouchableOpacity onPress={props.onRequestClose}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={Color.graylight}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <Searchbar
                placeholder="Search Your Location"
                inputStyle={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                }}
                style={{
                  borderRadius: 10,
                  elevation: 0,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }}
                // onChangeText={onChangeSearch}
                // value={searchQuery}
              />
            </View>
            <View
              style={{
                marginTop: 30,
              }}>
              <Button
                mode="contained"
                icon="crosshairs-gps"
                uppercase={false}
                contentStyle={styles.button}
                onPress={() => console.log('Pressed')}
                style={{margin: 20, borderRadius: 10}}>
                Pick your current location
              </Button>
            </View>
          </>
        );
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={props.onRequestClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onRequestClose}
        style={styles.centeredView}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={styles.modalView}>
          {modalView()}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: '#fff',
    // height: Dimension.window.height * 0.7,
  },
  modalView: {
    // margin: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: Dimension.window.width,
    height: Dimension.window.height * 0.55,
    padding: 25,
    backgroundColor: '#fff',
    // alignItems: 'center',
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
  location: {
    color: 'white',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
    // marginTop: 2,
    borderBottomColor: 'white',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Color.gray,
    // margin: 10,
  },
  ...locationSheetStyles,
});
