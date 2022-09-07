import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Color} from '../../theme';

export default function ProfilePicSheet(props) {
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      //   includeBase64: true,
    }).then(image => {
      props.setImage(image.path);
      props.onRequestClose();
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      //   includeBase64: true,
    }).then(image => {
      props.setImage(image.path);
      props.onRequestClose();
    });
  };

  return (
    <View style={styles.panel}>
      <View>
        <Text style={{...styles.panelTitle, color: '#000'}}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        // onPress={() => removeImage()}
      >
        <Text style={styles.panelButtonTitle}>Remove Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={props.onRequestClose}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  panelButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Color.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});
