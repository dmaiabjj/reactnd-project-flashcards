import React from 'react';
import { StatusBar } from 'react-native';
import { Constants } from 'expo';
import Styles from '@components/StatusBar/styles';

const Status = () => {
  return (
    <Styles.StatusBarStyledView size={Constants.statusBarHeight}>
      <StatusBar />
    </Styles.StatusBarStyledView>
  );
};

export default Status;
