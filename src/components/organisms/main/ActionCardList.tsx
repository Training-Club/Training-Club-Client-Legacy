import React from 'react';
import {ActionCard} from '../../molecules/main/ActionCard';
import {Box, HStack, ScrollView} from 'native-base';

interface IActionCardListProps {}

export const ActionCardList = ({}: IActionCardListProps) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <HStack space={2}>
        <ActionCard
          onPress={() => console.log('onPress')}
          bottomTextContent={{
            heading: 'Start',
            subheading: 'W1D4 Powerlifting',
          }}
          backgroundContent={
            <Box
              w={'100%'}
              h={'100%'}
              borderRadius={12}
              bgColor={'apple.indigo.light'}
            />
          }
        />

        <ActionCard
          bottomTextContent={{
            heading: 'Total Volume',
          }}
        />

        <ActionCard
          bottomTextContent={{
            heading: 'Start',
            subheading: 'W1D4 Powerlifting',
          }}
        />

        <ActionCard
          bottomTextContent={{
            heading: 'Start',
            subheading: 'W1D4 Powerlifting',
          }}
        />

        <ActionCard
          bottomTextContent={{
            heading: 'Start',
            subheading: 'W1D4 Powerlifting',
          }}
        />
      </HStack>
    </ScrollView>
  );
};
