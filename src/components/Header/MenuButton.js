import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import colors from '@styles/settings/colors';

const MenuButtonStyled = styled.TouchableOpacity``;

const MenuButton = ({ navigation }) => {
  return (
    <MenuButtonStyled onPress={() => navigation.toggleDrawer()}>
      <Icon font={{ name: 'navicon', size: 24, style: { color: colors.zero } }} />
    </MenuButtonStyled>
  );
};

MenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MenuButton;
