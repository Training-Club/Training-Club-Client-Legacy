import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Asynchronously writes the provided key/value pair to the devices
 * local storage. If the provided value is not the type of string
 * the object is converted to json and stored as a string representation
 *
 * @param {string} key Key/path to store value at
 * @param value Value to store at path
 */
export const writeItem = async (key: string, value: any): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (typeof value === 'string') {
        await AsyncStorage.setItem(`@${key}`, value);
        resolve();
      }

      const json = JSON.stringify(value);
      await AsyncStorage.setItem(`@${key}`, json);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Asynchronously reads the provided key value from the devices
 * local storage. If there is a field found at the provided path,
 * it will be returned in the form of a string.
 *
 * If parseJson is true, the function will attempt to marshal the string
 * back in to its original JSON object.
 *
 * @param {string} key Key/path to perform lookup at
 * @param {boolean} parseJson If true, the function will attempt to marshal the string back to json
 */
export const readItem = async (
  key: string,
  parseJson?: boolean,
): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(`@${key}`);

      if (value === null) {
        reject(new Error(`No object stored at path: ${key}`));
        return;
      }

      if (parseJson) {
        const json = JSON.parse(value);
        resolve(json);
        return;
      }

      resolve(value);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Asynchronously deletes an item at the provided key/path
 * from the devices local storage.
 *
 * @param {string} key Key/path to delete any values at
 */
export const deleteItem = async (key: string): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await AsyncStorage.removeItem(`@${key}`);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
