import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Tab, TabView} from '@rneui/themed';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Avatar, Button, useTheme} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BookedServiceModal from '../components/Modals/BookedServiceModal';
import MapModal from '../components/Modals/MapModal';
import {Color, Dimension} from '../theme';

const DetailScreen = ({navigation, route}) => {
  const data = route.params.item;

  const {colors} = useTheme();

  const [index, setIndex] = React.useState(0);
  const [bookingDate, setBookingDate] = React.useState(new Date());
  const [bookingPlace, setBookingPlace] = React.useState('D.D. Nagar, Gwalior');
  const [showModal, setShowModal] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);
  const bookRef = React.useRef(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setBookingDate(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: bookingDate,
      onChange,
      mode: currentMode,
      is24Hour: false,
      minimumDate: new Date(),
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const bookingSheet = () => {
    return (
      <RBSheet
        ref={bookRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            // backgroundColor: textColor,
          },
          container: {
            backgroundColor: colors.background,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}
        height={Dimension.window.height * 0.58}>
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}>
          <View>
            <Text style={{...styles.sheetTitle, color: colors.text}}>
              Book the provider
            </Text>
            <Text style={{...styles.sheetSubTitle, color: colors.subtext}}>
              Please fill the date-time and place to book the provider
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 30,
            }}>
            <Text style={{...styles.label, color: colors.text}}>
              Choose the date and time.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  ...styles.datetimeContainer,
                  width: '50%',
                  backgroundColor: colors.card,
                  borderColor: colors.subtext,
                }}
                onPress={showDatepicker}>
                <Text style={{...styles.datetime, color: colors.text}}>
                  {bookingDate.toLocaleDateString()}
                </Text>
                <MaterialCommunityIcons
                  name="calendar"
                  color={Color.primary}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.datetimeContainer,
                  width: '45%',
                  backgroundColor: colors.card,
                  borderColor: colors.subtext,
                }}
                onPress={showTimepicker}>
                <Text style={{...styles.datetime, color: colors.text}}>
                  {bookingDate
                    .toLocaleTimeString()
                    .replace(
                      bookingDate.toLocaleTimeString().slice(-6, -3),
                      '',
                    )}
                </Text>
                <MaterialCommunityIcons
                  name="clock-time-three"
                  color={Color.primary}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{...styles.label, color: colors.text}}>
              Choose the location.
            </Text>
            <TouchableOpacity
              style={{
                ...styles.datetimeContainer,
                backgroundColor: colors.card,
                borderColor: colors.subtext,
              }}
              onPress={() => {
                setShowMap(true);
                // bookRef.current.close();
                // navigation.navigate('Location');
              }}>
              <Text style={{...styles.datetime, color: colors.text}}>
                {bookingPlace}
              </Text>
              <MaterialCommunityIcons
                name="map-marker"
                color={Color.primary}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Button
              mode="contained"
              onPress={() => {
                bookRef.current.close();
                setShowModal(true);
              }}
              dark
              style={styles.button}
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}>
              Book
            </Button>
          </View>
        </View>
      </RBSheet>
    );
  };

  return (
    <>
      {bookingSheet()}
      <BookedServiceModal
        onRequestClose={() => setShowModal(false)}
        onPress={() => {
          bookRef.current.close();
          setShowModal(false);
          navigation.navigate('Bookings');
        }}
        visible={showModal}
      />
      <MapModal
        setBookingPlace={setBookingPlace}
        onRequestClose={() => setShowMap(false)}
        onPress={() => {
          setShowMap(false);
          // navigation.goBack();
        }}
        visible={showMap}
      />
      <View style={{...styles.avatarContainer, backgroundColor: colors.card}}>
        <Avatar.Image
          size={120}
          source={{uri: data.avatar}}
          icon="account"
          style={styles.avatar}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 80,
          }}>
          <Text style={{...styles.name, color: colors.text}}>
            {data.name}{' '}
            {data.isVerified ? (
              <MaterialCommunityIcons
                name="check-decagram" //
                size={16}
                color={'#458eff'}
              />
            ) : null}
          </Text>
          <Text style={{...styles.designation, color: colors.subtext}}>
            {data.designation}
          </Text>
        </View>
        <View style={styles.profileDetails}>
          <View>
            <Text style={{...styles.statsValue, color: colors.text}}>
              {data.rate}
            </Text>
            <Text style={{...styles.stats, color: colors.text}}>
              {data.chargeType == 'Fixed' ? ' fixed rate' : 'Hourly'}
            </Text>
          </View>
          <View>
            <Text style={{...styles.statsValue, color: colors.text}}>
              {data.rating}
              <MaterialCommunityIcons
                name="star"
                size={16}
                color={Color.primary}
              />
            </Text>
            <Text style={{...styles.stats, color: colors.text}}>out of 5</Text>
          </View>
          <View>
            <Text style={{...styles.statsValue, color: colors.text}}>
              {data.jobsDone}
            </Text>
            <Text style={{...styles.stats, color: colors.text}}>Jobs Done</Text>
          </View>
          <View>
            <Text style={{...styles.statsValue, color: colors.text}}>
              {data.employedTime} yrs
            </Text>
            <Text style={{...styles.stats, color: colors.text}}>
              Experience
            </Text>
          </View>
        </View>
      </View>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: Color.primary,
          height: 3,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        variant="default">
        <Tab.Item
          title="Info"
          titleStyle={{fontSize: 12, color: colors.text}}
          containerStyle={{
            backgroundColor: colors.card,
          }}
        />
        <Tab.Item
          title="Works"
          titleStyle={{fontSize: 12, color: colors.text}}
          containerStyle={{
            backgroundColor: colors.card,
          }}
        />
        <Tab.Item
          title="Feedbacks"
          titleStyle={{fontSize: 12, color: colors.text}}
          containerStyle={{
            backgroundColor: colors.card,
          }}
        />
      </Tab>

      <TabView
        value={index}
        onChange={setIndex}
        minSwipeRatio={0.1}
        animationType="spring"
        tabItemContainerStyle={{
          paddingHorizontal: 15,
        }}>
        <TabView.Item style={{width: '100%'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 80,
            }}>
            <View style={{...styles.card, backgroundColor: colors.card}}>
              <Text style={{...styles.cardTitle, color: colors.text}}>
                About
              </Text>
              <View style={styles.cardContent}>
                <MaterialCommunityIcons
                  name="information"
                  size={22}
                  color={colors.text}
                />
                <Text style={{...styles.cardText, color: colors.text}}>
                  {data.description}
                </Text>
              </View>
            </View>
            <View style={{...styles.card, backgroundColor: colors.card}}>
              <Text style={{...styles.cardTitle, color: colors.text}}>
                Address
              </Text>
              <View style={styles.cardContent}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={22}
                  color={colors.text}
                />
                <Text style={{...styles.cardText, color: colors.text}}>
                  {data.location}
                </Text>
              </View>
            </View>

            {/* <View style={{...styles.card,backgroundColor: colors.card}}>
              <View style={styles.cardAltContent}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialCommunityIcons
                    name="briefcase-check"
                    size={20}
                    color={Color.black}
                  />
                  <Text
                    style={{
                      ...styles.cardAltText,
                      color: Color.black,
                      marginLeft: 10,
                    }}>
                    {data.jobsDone} Jobs Completed
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="thumb-up"
                    size={16}
                    color={Color.black}
                  />
                  <Text
                    style={{
                      ...styles.cardAltText,
                      color: Color.black,
                      marginLeft: 10,
                    }}>
                    {data.completionRate} Completion
                  </Text>
                </View>
              </View>
            </View> */}
            <View style={{...styles.card, backgroundColor: colors.card}}>
              <Text style={{...styles.cardTitle, color: colors.text}}>
                Qualification
              </Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText, color: colors.text}}>
                  {data.qualification}
                </Text>
              </View>
            </View>
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 80,
            }}>
            <View>
              {/* <Text>Works</Text> */}
              <Image
                source={require('../assets/emptyWork.png')}
                style={styles.emptyPlaceholder}
              />
            </View>
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 80,
            }}>
            <View>
              {/* <Text>Works</Text> */}
              <Image
                source={require('../assets/emptyRating.png')}
                style={styles.emptyPlaceholder}
              />
            </View>
          </ScrollView>
        </TabView.Item>
      </TabView>
      <View style={styles.bottomContainer}>
        <Button
          color={Color.primary}
          mode="contained"
          labelStyle={{
            fontFamily: 'Poppins-Light',
          }}
          style={{
            margin: 5,
            width: '48%',
          }}
          onPress={() => bookRef.current.open()}>
          Book
        </Button>
        <Button
          color={Color.primary}
          labelStyle={{
            fontFamily: 'Poppins-Light',
          }}
          style={{
            margin: 5,
            marginLeft: 0,
            width: '48%',
          }}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Services
        </Button>
      </View>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 6,
    marginTop: 50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    backgroundColor: Color.primary,
    position: 'absolute',
    top: -40,
  },
  name: {
    fontSize: 18,
    color: Color.black,
    fontFamily: 'Poppins-Medium',
  },
  designation: {
    fontSize: 14,
    color: Color.black,
    fontFamily: 'Poppins-Regular',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 15,
    backgroundColor: Color.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#00000050',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: Color.black,
    fontFamily: 'Poppins-Medium',
  },
  cardContent: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cardText: {
    fontSize: 14,
    width: '95%',
    color: Color.black,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 5,
  },
  cardAltContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  cardAltText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Color.primary,
  },
  ratingText: {
    color: Color.primary,
    fontFamily: 'Poppins-Light',
    marginHorizontal: 5,
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '85%',
  },
  stats: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  statsValue: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  emptyPlaceholder: {
    position: 'relative',
    top: 0,
    left: 0,
    transform: [{translateY: 50}, {translateX: 75}],
    resizeMode: 'contain',
    height: 200,
    width: 200,
    tintColor: Color.graylight,
    opacity: 0.5,
  },
  sheetTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: Color.black,
  },
  sheetSubTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Color.gray,
  },
  label: {
    fontFamily: 'Poppins-Regular',
  },
  datetimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.white,
    marginTop: 5,
  },
  datetime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  button: {
    width: '100%',
    backgroundColor: Color.primary,
    borderRadius: 10,
  },
  buttonLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  buttonContent: {
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    // height: Dimension.window.height * 0.35,
    padding: 25,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    // width: '100%',
  },
});
