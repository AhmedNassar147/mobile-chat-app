import React from 'react';
import { Spinner } from 'native-base';

const Loader = props => <Spinner {...props} />;

Loader.defaultPorps = {
  color: 'blue',
  size: 'large'
}

export default Loader;