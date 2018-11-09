import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '@components/Icon/styles';

const Icon = ({ container, font }) => {
  return (
    <Styles.IconView {...container}>
      <FontAwesome {...font} />
    </Styles.IconView>
  );
};

export default Icon;
