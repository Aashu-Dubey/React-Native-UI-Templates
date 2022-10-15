import { Platform } from 'react-native';

export default {
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
};
