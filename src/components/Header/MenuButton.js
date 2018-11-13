import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import Styles from '@components/Header/styles';

class MenuButton extends PureComponent {
  render() {
    const { navigation, theme } = this.props;
    return (
      <Styles.MenuButtonStyledTouchable onPress={() => navigation.toggleDrawer()}>
        <Icon
          font={{ name: 'navicon', size: theme.icon.size.first, color: theme.font.color.first }}
        />
      </Styles.MenuButtonStyledTouchable>
    );
  }
}

MenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(MenuButton);
