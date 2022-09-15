import React from 'react';
import {Providers} from './src/Providers';
import Navigation from './src/Navigation';
import {registerIgnoredLogs} from './src/utils/LogBoxUtil';

// Hide useless/spam-y warning log messages
registerIgnoredLogs();

const App = () => {
  return (
    <Providers>
      <Navigation />
    </Providers>
  );
};

export default App;
