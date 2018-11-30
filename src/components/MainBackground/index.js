import React from 'react';
import PropTypes from 'prop-types';

import Styles from '@components/MainBackground/styles';

const MainBackground = ({ imageSrc }) => {
  return (
    <Styles.BackgroundStyledView>
      <Styles.BackgroundStyledImage source={imageSrc} />
    </Styles.BackgroundStyledView>
  );
};

MainBackground.propTypes = {
  imageSrc: PropTypes.number.isRequired,
};

export default MainBackground;
