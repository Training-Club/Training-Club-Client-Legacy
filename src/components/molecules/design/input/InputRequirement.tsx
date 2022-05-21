import React from 'react';
import {Stack} from 'native-base';
import {ResponsiveValue} from 'native-base/lib/typescript/components/types';

interface IInputRequirementProps {
  direction: ResponsiveValue<any>;
  space: ResponsiveValue<any>;
  children?: any;
}

const InputRequirement = ({
  direction,
  space,
  children,
}: IInputRequirementProps): JSX.Element => {
  return (
    <Stack direction={direction} space={space}>
      {children}
    </Stack>
  );
};

export default React.memo(InputRequirement);
