import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../theme';
import {ActivityIndicator, Button} from 'react-native-paper';

export default function CustomButton({label, onPress, loading}) {
  return (
    <Button
      onPress={onPress}
      loading={loading}
      mode="contained"
      dark
      contentStyle={{
        padding: 5,
      }}
      labelStyle={{
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
      }}
      style={{
        backgroundColor: Color.primary,
        borderRadius: 10,
        marginBottom: 30,
        elevation: 3,
      }}>
      {label}
    </Button>
  );
}

// style={{

//           }}
