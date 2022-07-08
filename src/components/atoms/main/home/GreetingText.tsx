import React from 'react';
import {Heading, useColorModeValue} from 'native-base';

interface IGreetingTextProps {
  name: string;
}

const GreetingText = ({name}: IGreetingTextProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');

  /**
   * Conditionally provides the time of the day
   * depending on the hour of the day set on this device
   */
  function getTime(): string {
    const time: Date = new Date();

    if (time.getHours() >= 16 || time.getHours() < 4) {
      return 'evening';
    } else if (time.getHours() >= 4 && time.getHours() < 12) {
      return 'morning';
    } else {
      return 'afternoon';
    }
  }

  return (
    <Heading testID={'greeting-text-heading'} color={textColor} my={4}>
      Good {getTime()}, {name}!
    </Heading>
  );
};

export default React.memo(GreetingText);
