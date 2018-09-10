import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './src';
import store from './src/modules';


const App = props => {
  return (
    <Provider store={store}>
      <AppContainer  {...props} />
    </Provider>
  )
}
export default App;
