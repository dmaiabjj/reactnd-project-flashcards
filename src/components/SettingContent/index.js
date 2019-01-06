import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import ToggleSwitch from 'toggle-switch-react-native';
import PropTypes from 'prop-types';

import Styles from '@components/SettingContent/styles';

import { Creators as ThemeCreators } from '@store/modules/themes';

class SettingContent extends PureComponent {
  state = {};

  componentDidMount() {
    const { mode } = this.props;
    this.setState((prevState) => {
      return { ...prevState, mode };
    });
  }

  onHandleChangeMode = (isOn) => {
    const { changeTheme } = this.props;
    const mode = isOn ? 'dark' : 'light';
    changeTheme(mode);
  };

  render() {
    const { theme, mode } = this.props;
    return (
      <Styles.ContentStyledView>
        <Styles.TitleTextStyledView>
          <Styles.TitleStyledText>Settings</Styles.TitleStyledText>
        </Styles.TitleTextStyledView>
        <ToggleSwitch
          isOn={mode === 'dark'}
          onColor="#007bff"
          offColor="#666666"
          label="Dark Mode"
          labelStyle={{ color: theme.font.color.third, fontWeight: '900' }}
          size="large"
          onToggle={(isOn) => this.onHandleChangeMode(isOn)}
        />
      </Styles.ContentStyledView>
    );
  }
}

function mapStateToProps(state) {
  const { themes } = state;
  return {
    mode: themes.theme,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTheme: (theme) => dispatch(ThemeCreators.changeTheme(theme)),
  };
}

SettingContent.propTypes = {
  theme: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SettingContent));
