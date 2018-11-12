import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '@components/Icon/styles';

const Icon = ({ container, font }) => {
  return (
    <Styles.IconStyledView {...container}>
      <FontAwesome {...font} />
    </Styles.IconStyledView>
  );
};

export default Icon;
