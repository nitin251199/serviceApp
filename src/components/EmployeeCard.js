import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar, useTheme} from 'react-native-paper';

import {Color, Dimension} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ServerURL } from '../API';

export default function EmployeeCard({employee, onPress}) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress()}
      style={{...styles.container, backgroundColor: colors.card}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              source={{
                uri: `${ServerURL}/application/${employee.image}`,
              }}
              size={64}
              icon="account"
              style={styles.avatar}
            />
            <View>
              <Text style={styles.designation}>{employee.product_name}</Text>
              <Text style={{...styles.name, color: colors.text}}>
                {employee.name}{' '}
                {employee.approval_status == '1' ? (
                  <MaterialCommunityIcons
                    name="check-decagram" //
                    size={16}
                    color={'#458eff'}
                  />
                ) : null}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.rate}>
              {employee.price}
              {employee.chargeType == 'Fixed' ? ' fixed rate' : '/Hr'}
            </Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={{...styles.detail, justifyContent: 'flex-start'}}>
            <MaterialCommunityIcons
              name="map-marker"
              size={13}
              color={colors.subtext}
            />
            <Text numberOfLines={1} style={{...styles.detailText, flex: 1}}>
              {' '}
              {employee.address}
            </Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={13}
              color={colors.subtext}
            />
            <Text style={styles.detailText}>
              {' '}
              {employee.distance} KM from you
            </Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons
              name="clock-time-three"
              size={13}
              color={colors.subtext}
            />
            <Text style={styles.detailText}>
              {' '}
              {new Date().getFullYear() -
                new Date(employee.created_at * 1000).getFullYear()}{' '}
              years ago
            </Text>
          </View>
          <View style={styles.detail}>
            {[...Array(5)].map((_, i) => {
              return (
                <MaterialCommunityIcons
                  key={i}
                  name="star"
                  size={16}
                  color={i < employee.rating ? Color.primary : Color.graylight}
                />
              );
            })}
            <Text style={{...styles.detailText, color: Color.primary}}>
              ({employee.rating}/5)
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailText}>
              <Text style={{color: Color.primary}}>{employee.jobsDone}</Text>{' '}
              Jobs Done
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailText}>
              <Text style={{color: Color.primary}}>
                {employee.completionRate}
              </Text>{' '}
              Completion
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimension.window.width * 0.95,
    padding: 10,
    // borderWidth: 2,
    // borderColor: Color.primary,
    // shadowColor: Color.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  avatar: {
    backgroundColor: Color.primary,
    marginHorizontal: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  designation: {
    paddingHorizontal: 10,
    color: Color.graylight,
    fontWeight: '300',
    fontSize: 13,
    fontFamily: 'Poppins-Light',
  },
  name: {
    paddingHorizontal: 10,
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    alignItems: 'center',
  },
  rate: {
    fontWeight: '600',
    fontSize: 16,
    color: Color.primary,
    fontFamily: 'Poppins-Medium',
  },
  detailsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detail: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    width: '33%',
    marginTop: 5,
  },
  detailText: {
    fontSize: 12,
    color: Color.gray,
    fontFamily: 'Poppins-Light',
  },
});
