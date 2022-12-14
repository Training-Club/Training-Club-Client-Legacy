import React from 'react';
import {Keyboard} from 'react-native';

/**
 * useKeyboard hook will add two listeners that subscribe to
 * keyboard show and hide events. From here, you can tell if the keyboard is open
 * with {@link isKeyboardOpen}
 */
export function useKeyboard() {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
}
