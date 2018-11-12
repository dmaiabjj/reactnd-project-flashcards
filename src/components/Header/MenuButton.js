import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import sizes from '@styles/settings/sizes';
import colors from '@styles/settings/colors';
import Styles from '@components/Header/styles';

const MenuButton = ({ navigation }) => {
  return (
    <Styles.MenuButtonStyledTouchable onPress={() => navigation.toggleDrawer()}>
      <Icon font={{ name: 'navicon', size: sizes.icon.min, color: colors.light.fonts.zero }} />
    </Styles.MenuButtonStyledTouchable>
  );
};

MenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MenuButton;
