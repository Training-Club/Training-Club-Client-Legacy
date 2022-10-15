import {store} from './Storage';

/**
 * Asynchronously writes the provided key/value pair to the devices
 * local storage. If the provided value is not the type of string
 * the object is converted to json and stored as a string representation
 *
 * @param {string} collection Collection to save key/value at
 * @param {string} key Key/path to store value at
 * @param value Value to store at path
 */
export const writeItem = async (
  collection: string,
  key: string,
  value: any,
): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (typeof value === 'string') {
        await store.save({
          key: collection,
          id: key,
          data: value,
          expires: null,
        });

        resolve();
        return;
      }

      const json = JSON.stringify(value);
      await store.save({key: collection, id: key, data: json, expires: null});

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Asynchronously reads the provided key value from the devices
 * local storage. If there is a field found at the provided path,
 * it will be returned as the form of a string.
 *
 * If parseJson is true, the function will attempt to marshal the string
 * back in to its original JSON object.
 *
 * @param {string} collection Collection to perform lookup at
 * @param {string} key Key to search for
 * @param {boolean} parseJson If true, the function will attempt to marshal the string back to json
 */
export const readItem = async (
  collection: string,
  key: string,
  parseJson?: boolean,
): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const value = await store.load({key: collection, id: key});

      if (!value) {
        reject(new Error(`No object stored at path: ${key}`));
        return;
      }

      if (parseJson) {
        const json = JSON.parse(value);
        resolve(json);
        return;
      }

      console.log('resolved: ' + value);
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
 * @param {string} collection Collection to perform lookup at
 * @param {string} key Key/path to delete any values at
 */
export const deleteItem = async (
  collection: string,
  key: string,
): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await store.remove({key: collection, id: key});
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
