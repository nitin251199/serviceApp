import {StyleSheet} from 'react-native';
import {Color, Dimension} from '../../theme';

export const locationSheetStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimension.window.width,
    // alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.primary,
    padding: 10,
  },
  searchContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 8,
  },
});
