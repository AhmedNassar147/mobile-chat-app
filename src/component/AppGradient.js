import React from 'react'
import { LinearGradient } from 'expo';
import { theme } from '../globals';
const { purple, lightPurple } = theme;

const AppGradient = ({ style, children }) => (
  <LinearGradient
    colors={[lightPurple, purple]}
    start={[0.83, 0]}
    end={[0.35, 0.85]}
    locations={[0.7, 0.3]}
    style={style}
  >
    {children}
  </LinearGradient>
);

export default AppGradient;