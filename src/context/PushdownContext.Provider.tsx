import React from 'react';
import {PushdownContext, IPushdownConfig} from './PushdownContext';
import Pushdown from '../components/molecules/design/Pushdown';
import {Box} from 'native-base';

export function PushdownContextProvider({children}: any) {
  const [pushdownConfig, setPushdownConfig] = React.useState<IPushdownConfig>(
    {},
  );

  React.useEffect(() => {
    if (!pushdownConfig.show) {
      return;
    }

    setTimeout(() => {
      if (!pushdownConfig.show) {
        return;
      }

      setPushdownConfig({...pushdownConfig, show: false});
    }, pushdownConfig.duration ?? 5000);
  }, [pushdownConfig]);

  function handleClose() {
    console.log('handleClose');
    setPushdownConfig({...pushdownConfig, show: false});
  }

  return (
    <PushdownContext.Provider value={{pushdownConfig, setPushdownConfig}}>
      <>
        {pushdownConfig.show && (
          <Box w={'100%'} px={4} zIndex={9} ml={4}>
            <Pushdown
              title={pushdownConfig.title}
              body={pushdownConfig.body}
              status={pushdownConfig.status}
              onClose={handleClose}
            />
          </Box>
        )}

        {children}
      </>
    </PushdownContext.Provider>
  );
}
