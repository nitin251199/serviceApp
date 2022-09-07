import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {markers, mapDarkStyle, mapStandardStyle} from '../utils/mapConstants';
import StarRating from '../components/StarRating';

import {useTheme} from '@react-navigation/native';
import {Color} from '../theme';
import {categories, services} from '../utils/testConstants';
import {Avatar, Button, Chip} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function MapScreen(props) {
  const theme = useTheme();

  const initialMapState = {
    markers: services,
    categories: categories,
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        // provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}>
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={e => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <View
        style={{...styles.searchBox, backgroundColor: theme.colors.background}}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor={theme.colors.text}
          autoCapitalize="none"
          style={{
            flex: 1,
            padding: 0,
            fontFamily: 'Poppins-Regular',
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
          }}
        />
        <Ionicons name="ios-search" size={20} color={theme.colors.text} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0,
        }}>
        {state.categories.map((category, index) => (
          <Chip
            avatar={<Avatar.Image size={24} source={{uri: category.image}} />}
            style={{
              ...styles.chipsItem,
              backgroundColor: theme.colors.background,
            }}
            key={index}
            textStyle={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              paddingHorizontal: 15,
              color: theme.colors.text,
            }}
            onPress={() => console.log('Pressed')}>
            {category.name}
          </Chip>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={
          {
            // paddingHorizontal:
            //   Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }
        }
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {state.markers.map((marker, index) => (
          <View
            style={{...styles.card, backgroundColor: theme.colors.background}}
            key={index}>
            <View style={styles.textContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.avatarContainer}>
                  <Avatar.Image
                    source={{
                      uri: marker.avatar,
                    }}
                    size={60}
                    icon="account"
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.designation}>{marker.designation}</Text>
                    <Text style={{...styles.name, color: theme.colors.text}}>
                      {marker.name}{' '}
                      {marker.isVerified ? (
                        <MaterialCommunityIcons
                          name="check-decagram" //
                          size={14}
                          color={'#458eff'}
                        />
                      ) : null}
                    </Text>
                    <StarRating ratings={marker.rating} />
                  </View>
                </View>
                <View>
                  <Text style={styles.rate}>
                    {marker.rate}
                    {marker.chargeType == 'Fixed' ? '' : '/Hr'}
                  </Text>
                </View>
              </View>
              <Text
                numberOfLines={1}
                style={{...styles.cardDescription, color: theme.colors.subtext}}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Details', {item: marker})
                  }
                  style={[
                    styles.signIn,
                    {
                      borderColor: Color.primary,
                      borderWidth: 1,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: Color.primary,
                      },
                    ]}>
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    // paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    // height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    // flex: 2,
    padding: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    // marginTop: 5,
    // fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'Poppins-Regular',
    margin: 10,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '95%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
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
    fontSize: 14,
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
    fontSize: 20,
    color: Color.primary,
    marginRight: 10,
    fontFamily: 'Poppins-Medium',
  },
});
