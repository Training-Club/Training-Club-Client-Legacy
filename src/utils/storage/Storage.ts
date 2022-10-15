import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = new Storage({
  size: 100,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {},
});
