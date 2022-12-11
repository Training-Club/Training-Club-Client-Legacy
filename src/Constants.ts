import {Platform} from 'react-native';

export const API_URL = __DEV__
  ? `http://${Platform.OS === 'ios' ? 'localhost' : '192.168.0.230'}:8080/v1`
  : 'http://146.190.2.76:80/v1';
