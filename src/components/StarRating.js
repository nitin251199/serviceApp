import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../theme';

const StarRating = props => {
  // This array will contain our star tags. We will include this
  // array between the view tag.
  let stars = [];
  // Loop 5 times
  for (var i = 1; i <= 5; i++) {
    // set the path to filled stars
    let color = Color.primary;
    // If ratings is lower, set the path to unfilled stars
    if (i > props.ratings) {
      color = Color.graylight;
    }

    stars.push(
      <MaterialCommunityIcons name="star" size={14} color={color} key={i} />,
    );
  }

  return (
    <View style={styles.container}>
      {stars}
      {/* <Text style={styles.text}>({props.reviews})</Text> */}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 12,
    marginLeft: 5,
    color: '#444',
  },
});
