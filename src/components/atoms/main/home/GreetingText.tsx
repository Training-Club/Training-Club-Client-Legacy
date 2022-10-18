import React from 'react';
import {Heading, useColorModeValue} from 'native-base';

interface IGreetingTextProps {
  name: string;
  time: Date;
}

const GreetingText = ({name, time}: IGreetingTextProps): JSX.Element => {
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  /**
   * Conditionally provides the time of the day
   * depending on the hour of the day set on this device
   */
  const getTime = React.useCallback(() => {
    if (time.getHours() >= 16 || time.getHours() < 4) {
      return 'evening';
    } else if (time.getHours() >= 4 && time.getHours() < 12) {
      return 'morning';
    } else {
      return 'afternoon';
    }
  }, [time]);

  return (
    <Heading testID={'greeting-text-heading'} color={textColor} my={4}>
      Good {getTime()}, {name}!
    </Heading>
  );
};

export default React.memo(GreetingText);
