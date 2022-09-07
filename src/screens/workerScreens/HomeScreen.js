import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BannerSlider from '../../components/BannerSlider';
import {Color, Dimension, Fonts} from '../../theme';
import EmployeeCard from '../../components/EmployeeCard';
import {FAB, Searchbar} from 'react-native-paper';
import CategoryItem from '../../components/CategoryItem';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import SearchProvider from '../../components/SearchBar';
import LocationSheet from '../../components/BottomSheets/LocationSheet';
import { postData} from '../../API';

const {width, height} = Dimension.window;

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const [banner, setBanner] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [serviceList, setServiceList] = React.useState(services);
  const [loading, setLoading] = React.useState(false);

  const scrollRef = React.useRef(null);

  const fetchHome = async () => {
    let body = {};
    const data = await postData('api/getHome', body);
    if (data.success) {
      setBanner(data?.Banner_image);
      setServices(data?.top_service);
      setServiceList(data?.top_service);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <View style={styles.container}>
      {/* <SearchProvider navigation={navigation} /> */}
      <ScrollView
        ref={scrollRef}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{paddingBottom: 50}}>
        <View>
          <BannerSlider slides={banner} />
        </View>
        <View
          style={{
            ...styles.categoryMainContainer,
            backgroundColor: colors.background,
          }}>
          <View style={styles.categoryHeaderContainer}>
            <Text style={{...styles.title, color: colors.text}}>Jobs</Text>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Category');
              }}>
              <Text
                style={{
                  ...styles.subtitle,
                  color: colors.subtext,
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.employeeList}>
            <SkeletonContent
              isLoading={loading}
              boneColor="#c5c5c5"
              highlightColor="#ebebeb"
              containerStyle={{
                // width: width * 0.9,
                flexDirection: 'column',
                flex: 1,
              }}
              layout={[
                {
                  height: height * 0.17,
                  width: width * 0.95,
                  marginTop: 15,
                  resizeMode: 'stretch',
                  borderRadius: 5,
                },
                {
                  height: height * 0.17,
                  width: width * 0.95,
                  marginTop: 15,
                  resizeMode: 'stretch',
                  borderRadius: 5,
                },
                {
                  height: height * 0.17,
                  width: width * 0.95,
                  marginTop: 15,
                  resizeMode: 'stretch',
                  borderRadius: 5,
                },
              ]}>
              {serviceList.length > 0 ? (
                serviceList.map((item, index) => {
                  return (
                    <EmployeeCard
                      employee={item}
                      key={index}
                      onPress={() => navigation.navigate('Details', {item})}
                    />
                  );
                })
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height * 0.4,
                  }}>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 22,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    No Jobs Available
                  </Text>
                </View>
              )}
            </SkeletonContent>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  bannerContainer: {
    marginTop: 50,
  },
  employeeList: {
    padding: 10,
  },
  sheetContainer: {
    padding: 20,
  },
  sheetHeading: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  categoryMainContainer: {
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  categoryHeaderContainer: {
    width: Dimension.window.width,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    fontSize: 16,
  },
  subtitle: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.gray,
    fontSize: 14,
  },
});
