import React from 'react';
import { Constants } from 'expo';
import Styles from '@components/StatusBar/styles';

const View = () => {
  return <Styles.StatusBarView size={Constants.statusBarHeight} />;
};

export default View;
