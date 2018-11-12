import React from 'react';
import Styles from '@components/MainContent/styles';
import PropTypes from 'prop-types';

const MainContent = ({ children }) => {
  return <Styles.MainContentStyledView>{children}</Styles.MainContentStyledView>;
};

MainContent.propTypes = {
  children: PropTypes.array.isRequired,
};

export default MainContent;
