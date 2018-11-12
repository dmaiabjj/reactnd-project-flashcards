import React from 'react';
import MenuButton from '@components/Header/MenuButton';
import Styles from '@components/Header/styles';

const MenuLeft = (props) => {
  return (
    <Styles.MenuLeftStyledView>
      <MenuButton {...props} />
    </Styles.MenuLeftStyledView>
  );
};

export default MenuLeft;
