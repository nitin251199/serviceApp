import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar, useTheme} from 'react-native-paper';

import {Color, Dimension} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RazorpayCheckout from 'react-native-razorpay';
import {errorToast, successToast} from './Toasts';

export default function BookingCard({data}) {
  const {colors} = useTheme();

  const goToPayment = () => {
    var options = {
      description: 'Service Category Name',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_GQ6XaPC6gMPNwH',
      amount: 500 * 100, //  = INR 1
      name: 'John Doe',
      // order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: Color.primary, backgroundColor: colors.background},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        successToast('Payment Successful', 'Thank you for your payment');
        // alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        errorToast('Payment Failed', 'Please try again');
        // alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimension.window.width * 0.95,
      // padding: 10,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 15,
      marginBottom: 18,
      backgroundColor: colors.card,
      // elevation: 10,
    },
    avatar: {
      backgroundColor: Color.primary,
    },
    avatarContainer: {
      width: '15%',
    },
    designation: {
      color: Color.graylight,
      fontWeight: '300',
      fontSize: 14,
      fontFamily: 'Poppins-Light',
    },
    name: {
      padding: 10,
      fontWeight: '600',
      fontSize: 18,
      fontFamily: 'Poppins-Medium',
      textAlign: 'center',
    },
    rate: {
      fontWeight: '600',
      fontSize: 16,
      color: Color.primary,
      fontFamily: 'Poppins-Medium',
    },
    detailsContainer: {
      // marginTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    detail: {
      paddingLeft: 20,
      paddingRight: 10,
      flexDirection: 'column',
      // alignItems: 'center',
      width: '85%',
      marginTop: 5,
    },
    detailText: {
      fontSize: 12,
      color: colors.text,
      fontFamily: 'Poppins-Light',
      paddingLeft: 10,
    },
    bottomContainer: {
      flexDirection: 'row',
      borderBottomWidth: 0.2,
      // marginHorizontal: 20,
      marginTop: 10,
    },
    bottom: {
      borderRightWidth: 0.2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomText: {
      fontFamily: 'Poppins-Light',
      padding: 10,
      fontSize: 12,
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{padding: 10}}>
        <View>
          <Text style={{...styles.name, color: colors.text}}>
            Booking with {data.name}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              source={{uri: data.avatar}}
              size={60}
              icon="account"
              style={styles.avatar}
            />
          </View>
          <View style={styles.detail}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.designation}>{data.designation}</Text>
              <Text style={styles.rate}>
                {data.rate}
                {data.chargeType == 'Fixed' ? '' : '/Hr'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={23}
                color={Color.primary}
              />
              <Text style={styles.detailText}>{data.dateTime}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <MaterialCommunityIcons
                name="map-marker"
                size={23}
                color={Color.primary}
              />
              <Text style={styles.detailText}>{data.location}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              {data.invoiceStatus == 'Invoice Generated' ? (
                <MaterialCommunityIcons
                  name="check-bold"
                  size={23}
                  color={Color.primary}
                />
              ) : (
                <MaterialCommunityIcons
                  name="timer-sand-full"
                  size={23}
                  color={Color.primary}
                />
              )}
              <Text style={styles.detailText}>{data.invoiceStatus}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <MaterialCommunityIcons
                name="hours-24"
                size={23}
                color={Color.primary}
              />
              <Text style={styles.detailText}>{data.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottom}>
            <MaterialCommunityIcons
              name="briefcase-check"
              size={30}
              color={Color.primary}
            />
            <Text style={styles.bottomText}>
              {data.jobsDone} Jobs Completed
            </Text>
          </View>
          <View
            style={{...styles.bottom, borderRightWidth: 0, paddingLeft: 15}}>
            <MaterialCommunityIcons
              name="thumb-up"
              size={30}
              color={Color.primary}
            />
            <Text style={styles.bottomText}>
              {data.completionRate} Completion
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          paddingTop: 10,
          backgroundColor: Color.primary,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          // elevation: 10,
        }}
        onPress={() => goToPayment()}>
        <View>
          <Text style={{...styles.name, color: '#FFF'}}>
            {data.status}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
