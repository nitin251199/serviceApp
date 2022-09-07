import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      renderTrailingIcon={() => (
        <MaterialCommunityIcons
          name="check-circle"
          color="#3CB371"
          size={24}
          style={{
            margin: 18,
          }}
        />
        // <AnimatedLottieView
        //   source={require('../../assets/animations/success.json')}
        //   style={{width: 50, height: 50, margin: 3}}
        //   autoPlay
        //   loop={false}
        // />
      )}
      style={{
        // borderLeftColor: 'white',
        borderLeftColor: '#3CB371',
      }}
      contentContainerStyle={
        {
          // padding: 15,
          // backgroundColor: '#3CB371',
        }
      }
      text1Style={{
        fontSize: 16,
        // color: 'white',
        fontFamily: 'Poppins-SemiBold',
      }}
      text2Style={{
        fontSize: 13,
        // color: 'white',
        fontFamily: 'Poppins-Regular',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
      }}
      renderTrailingIcon={() => (
        <MaterialCommunityIcons
          name="close-circle"
          color="red"
          size={24}
          style={{
            margin: 18,
          }}
        />
      )}
    />
  ),
  /*
    Overwrite 'info' type,
    by modifying the existing `BaseToast` component
    */
  info: props => (
    <InfoToast
      {...props}
      text1Style={{
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
      }}
      renderTrailingIcon={() => (
        <MaterialCommunityIcons
          name="information"
          color="skyblue"
          size={24}
          style={{
            margin: 18,
          }}
        />
      )}
    />
  ),
};

export const successToast = (title, subTitle) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: subTitle,
  });
};

export const errorToast = (title, subTitle) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: subTitle,
  });
};

export const infoToast = (title, subTitle) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: subTitle,
  });
};
