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
import {postData} from '../../API';
import {getLocation} from '../../utils/getCurrentLocation';

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
    let location = await getLocation();
    console.log(">>>",location);
    let body = {};
    const data = await postData('api/getHome', body);
    if (data.success) {
      setBanner(data?.Banner_image);
      setCategories(data?.category);
      setServices(data?.top_service);
      setServiceList(data?.top_service);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  const onCategoryClick = query => {
    setLoading(true);
    if (query !== '') {
      if (query == 'All') {
        setServiceList(services);
        return setLoading(false);
      }
      setTimeout(() => {
        const filteredData = services.filter(item => {
          return Object.values(item)
            .join('')
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        setServiceList(filteredData);
        setLoading(false);
      }, 1000);
    } else {
      setServiceList(services);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchProvider navigation={navigation} />
      <ScrollView
        ref={scrollRef}
        stickyHeaderIndices={[1]}
        contentContainerStyle={{marginTop: 48, paddingBottom: 50}}>
        <View>
          <BannerSlider slides={banner} />
        </View>
        <View
          style={{
            ...styles.categoryMainContainer,
            backgroundColor: colors.background,
          }}>
          <View style={styles.categoryHeaderContainer}>
            <Text style={{...styles.title, color: colors.text}}>
              Service Categories
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Category');
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

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => (
              <CategoryItem
                item={{
                  id: 0,
                  cat_name: 'All',
                  image: 'all.png',
                }}
                index={0}
                onPress={() => {
                  scrollRef.current.scrollTo({x: 0, y: 190, animated: true});
                  onCategoryClick('All');
                }}
              />
            )}
            renderItem={({item, index}) => (
              <CategoryItem
                item={item}
                index={index + 1}
                onPress={() => {
                  scrollRef.current.scrollTo({x: 0, y: 190, animated: true});
                  onCategoryClick(item.name);
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={{
            ...styles.categoryMainContainer,
            backgroundColor: colors.background,
          }}>
          <View style={styles.categoryHeaderContainer}>
            <Text style={{...styles.title, color: colors.text}}>Services</Text>
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
          {/* <FlatList
            data={services}
            keyExtractor={(item, index) => index}
            numColumns={3}
            renderItem={({item}) => <EmployeeCard employee={item} />}
            style={styles.employeeList}
          /> */}
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
              {serviceList.map((item, index) => {
                return (
                  <EmployeeCard
                    employee={item}
                    key={index}
                    onPress={() => navigation.navigate('Details', {item})}
                  />
                );
              })}
              {/* <FlatList
                data={serviceList}
                // nestedScrollEnabled
                // maxHeight={height * 0.5}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <EmployeeCard
                    employee={item}
                    onPress={() => navigation.navigate('Details', {item})}
                  />
                )}
              /> */}
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
