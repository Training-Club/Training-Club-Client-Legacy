import {
  Album,
  CameraRoll,
  PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';
import {PermissionsAndroid, Platform} from 'react-native';

/**
 * Returns true if this device has permission to access content files
 * using the Android permission system
 */
export async function hasAndroidPermission() {
  const perm = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  const hasPermission = await PermissionsAndroid.check(perm);

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(perm, {
    title: 'Training Club is requesting permission',
    message: 'Training Club would like to access your media library',
    buttonPositive: 'Agree',
  });

  return status === PermissionsAndroid.RESULTS.GRANTED;
}

/**
 * Elegantly wraps CameraRoll#getAlbums, checks for permission if device
 * is an Android device, and then returns a promise with an array of albums
 */
export async function getAlbums() {
  return new Promise<Album[]>(async (resolve, reject) => {
    if (Platform.OS === 'android') {
      try {
        const hasPermission = await hasAndroidPermission();

        if (!hasPermission) {
          return reject('no permission from device');
        }
      } catch (err) {
        return reject(`rejected with error on permission check: ${err}`);
      }
    }

    try {
      const albumData = await CameraRoll.getAlbums({assetType: 'All'});
      return resolve(albumData);
    } catch (err) {
      return reject(err);
    }
  });
}

export async function getPhotos(page?: number) {
  return new Promise<PhotoIdentifiersPage>(async (resolve, reject) => {
    if (Platform.OS === 'android') {
      try {
        const hasPermission = await hasAndroidPermission();

        if (!hasPermission) {
          return reject('no permission from device');
        }
      } catch (err) {
        return reject(`rejected with error on permission check: ${err}`);
      }
    }

    try {
      const photoData = await CameraRoll.getPhotos({
        first: 100,
        assetType: 'All',
        mimeTypes: ['image/jpeg', 'image/png', 'video/mp4'],
      });

      return resolve(photoData);
    } catch (err) {
      return reject(err);
    }
  });
}
