import {LogBox} from 'react-native';

/**
 * This function will register specific string patterns to be hidden
 * from the console while running in DEV mode.
 *
 * To hide a new message, push to the 'ignored' array list with the pattern
 * you're looking to hide.
 */
export function registerIgnoredLogs() {
  if (!__DEV__) {
    return;
  }

  const ignored: (string | RegExp)[] = [];

  ignored.push(
    'Check the render method of `ExerciseCard`. See https://reactjs.org/link/warning-keys for more information.',
  );

  LogBox.ignoreLogs(ignored);

  console.log('ignoring the following log output:');
  console.log(ignored.join('\n'));
}
