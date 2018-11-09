import React from 'react';
import { StatusBar } from 'react-native';
import { Constants } from 'expo';
import View from '@components/StatusBar/View';

const Status = () => {
  return (
    <View size={Constants.statusBarHeight}>
      <StatusBar />
    </View>
  );
};

export default Status;
