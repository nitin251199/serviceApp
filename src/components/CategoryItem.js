import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color, Dimension, Fonts} from '../theme';
import {useTheme} from 'react-native-paper';
import {ServerURL} from '../API';

export default function CategoryItem({item, onPress}) {
  const {colors} = useTheme();

  return (
    <View style={styles.categoryDetailsContainer}>
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <Image
          source={{
            uri: `${ServerURL}/application/assets/category/${item.image}`,
          }}
          style={styles.categoryContainer}
        />

        <Text style={{...styles.catTitle, color: colors.text}}>
          {item.cat_name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    height: Dimension.window.width / 3 - 40,
    width: Dimension.window.width / 3 - 40,
    margin: 10,
    borderRadius: 50,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    // elevation: 10,
    resizeMode: 'cover',
  },
  categoryDetailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 8,
  },
  catTitle: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    fontSize: 12,
    // width: 80,
    // height: 35,
    textAlign: 'center',
    // marginLeft: 10,
  },
});
