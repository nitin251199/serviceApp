import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {Linking} from 'react-native';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Button, Searchbar, useTheme} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {locationSheetStyles} from '../components/BottomSheets/LocationSheet';
import {Dimension, Color} from '../theme';

export default function AppHeader({navigation, route}) {
  const _sheetRef = React.useRef(null);
  const theme = useTheme();

  // useEffect(() => {
  //   console.log(route);
  // }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={Color.primary}
      />
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: Dimension.window.width,
          backgroundColor: Color.primary,
          height: Dimension.window.height * 0.065,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{marginHorizontal: 15}}>
            <MaterialCommunityIcons name="menu" color={'#fff'} size={20} />
          </TouchableOpacity>
          <Text style={styles.heading}>{route.name}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => _sheetRef.current.open()}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              color={'#fff'}
              size={24}
            />
            <Text
              style={{
                ...styles.location,
                color: '#fff',
                borderBottomColor: '#fff',
              }}>
              Your Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={_sheetRef}
        closeOnDragDown
        closeOnPressMask
        height={Dimension.window.height * 0.65}
        customStyles={{
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 0,
            },
          },
        }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>Search Location</Text>
            <TouchableOpacity onPress={() => _sheetRef.current.close()}>
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
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  location: {
    color: 'white',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
    // marginTop: 2,
  },
  ...locationSheetStyles,
});
