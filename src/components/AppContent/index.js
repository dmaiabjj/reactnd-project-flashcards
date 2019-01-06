import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import Route from '@routes/index';
import modes from '@styles/settings/themes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AppContent = ({ theme }) => {
  return (
    <ThemeProvider theme={modes[theme]}>
      <Route />
    </ThemeProvider>
  );
};

function mapStateToProps(state) {
  const { themes } = state;
  return {
    theme: themes.theme,
  };
}

AppContent.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(AppContent);
