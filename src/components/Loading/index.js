import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import Styles from '@components/Loading/styles';

const Loading = ({ color }) => {
  return (
    <Styles.LoadingStyledView>
      <Styles.LoadingStyledText>Loading</Styles.LoadingStyledText>
      <ActivityIndicator size="large" color={color} />
    </Styles.LoadingStyledView>
  );
};

Loading.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Loading;
