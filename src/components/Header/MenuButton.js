import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import colors from '@styles/settings/colors';
import Styles from '@components/Header/styles';

const MenuButton = ({ navigation }) => {
  return (
    <Styles.MenuButtonTouchable onPress={() => navigation.toggleDrawer()}>
      <Icon font={{ name: 'navicon', size: 24, style: { color: colors.zero } }} />
    </Styles.MenuButtonTouchable>
  );
};

MenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MenuButton;
