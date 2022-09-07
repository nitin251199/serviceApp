import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme} from 'react-native-paper';
import BookingCard from '../../components/BookingCard';
import {Color} from '../../theme';
import {bookingList} from '../../utils/testConstants';

const BookingScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color: colors.text}}>
        Your Booked Services
      </Text>
      {/* <Searchbar
        placeholder="Search by Provider"
        inputStyle={styles.inputStyle}
        // onChangeText={onChangeSearch}
        // value={searchQuery}
      /> */}
      <View style={{
        alignItems:'center'
      }}>
        <FlatList
          data={bookingList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <BookingCard data={item} />}
          style={styles.list}
          // contentContainerStyle={{alignItems:'center'}}
        />
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingVertical: 15,
    textAlign: 'center',
  },
  inputStyle: {
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
    textAlign: 'center',
    padding: 0,
  },
  list: {
    // paddingTop: 20,
    // alignItems: 'center',
  },
});
