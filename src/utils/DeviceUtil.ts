import {Dimensions} from 'react-native';
import {getDeviceId} from 'react-native-device-info';

/**
 * Returns true if the device is considered small
 *
 * Useful for enabling additional padding
 */
export function isSmallScreen() {
  const deviceInfo = getDeviceId();
  const width = Dimensions.get('screen').width;

  // Add devices you want to exempt here
  // https://github.com/react-native-device-info/react-native-device-info/issues/836
  const exemptDevices = ['iPhone10,3', 'iPhone10,6'];

  if (exemptDevices.find(device => device === deviceInfo)) {
    return false;
  }

  if (width <= 375) {
    return true;
  }

  return false;
}
