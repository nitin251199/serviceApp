import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import ViewSlider from './ViewSlider';
import Dimension from '../theme/Dimension';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../theme/Color';
import {ServerURL} from '../API';
const {width, height} = Dimension.window;

function BannerSlider({slides}) {
  return (
    <ViewSlider
      renderSlides={slides.map((item, index) => {
        return (
          <View style={styles.viewBox} key={index}>
            <TouchableOpacity>
              <Image
                style={{...styles.bannerImage, ...styles.moreStyles}}
                source={{
                  uri: `${ServerURL}/application/assets/sliders/${item.image}`,
                }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
      style={styles.slider} //Main slider container style
      height={180} //Height of your slider
      slideCount={slides?.length} //How many views you are adding to slide
      dots={true} // Pagination dots visibility true for visibile
      dotActiveColor={Color.primary} //Pagination dot active color
      dotInactiveColor={Color.gray} // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
      autoSlide={true} //The views will slide automatically
      slideInterval={3000} //In Miliseconds
    />
  );
}
const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: width,
    alignItems: 'center',
    height: '100%',
  },
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  moreStyles: {
    height: 200,
    width,
  },
});

export default BannerSlider;
