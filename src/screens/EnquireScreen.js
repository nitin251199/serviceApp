import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button, useTheme} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {Color} from '../theme';

const ExploreScreen = () => {
  const {colors} = useTheme();

  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color: colors.text}}>Enquiry Form</Text>
      <TextInput
        label="Name"
        mode="outlined"
        outlineColor="#ddd"
        activeOutlineColor={Color.primary}
        style={styles.input}
        // value={text}
        // onChangeText={text => setText(text)}
      />
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedCategory}
          placeholder="Select Category"
          themeVariant="light"
          mode="dropdown"
          dropdownIconColor={Color.primary}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="Select Service Category"
            value=""
            color="#999"
            // enabled={false}
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="AC Services"
            value="AC Services"
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="Plumber"
            value="Plumber"
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="Garderning"
            value="Garderning"
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="LPG Services"
            value="LPG Services"
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="Electrician"
            value="Electrician"
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="Physician"
            value="Physician"
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="Mason Services"
            value="Mason Services"
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="Carpenter"
            value="Carpenter"
          />
          <Picker.Item
            fontFamily="Poppins-Regular"
            style={{
              ...styles.pickerItem,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            label="Iron works"
            value="Iron works"
          />
        </Picker>
      </View>
      <TextInput
        label="Work Description"
        mode="outlined"
        outlineColor="#ddd"
        multiline
        numberOfLines={6}
        activeOutlineColor={Color.primary}
        style={styles.input}
        // value={text}
        // onChangeText={text => setText(text)}
      />
      <Button
        mode="contained"
        contentStyle={styles.button}
        style={{marginVertical: 20}}
        dark
        labelStyle={{fontFamily: 'Poppins-Medium'}}
        onPress={() => console.log('Pressed')}>
        Enquire
      </Button>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingBottom: 20,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    // backgroundColor: '#f7f7f7',
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    // backgroundColor: '#f7f7f7',
    borderColor: '#ddd',
    overflow: 'hidden',
    padding: 0,
  },
  pickerItem: {
    // fontFamily: 'Poppins-Regular',
    // backgroundColor: '#f7f7f7',
    color: '#000',
  },
  button: {
    // marginVertical: 20,
    paddingVertical: 10,
    backgroundColor: Color.primary,
    // borderRadius: 5,
  },
});
