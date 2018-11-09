import React from 'react';
import MenuButton from '@components/Header/MenuButton';
import Styles from '@components/Header/styles';

const MenuLeft = (props) => {
  return (
    <Styles.MenuLeftView>
      <MenuButton {...props} />
    </Styles.MenuLeftView>
  );
};

export default MenuLeft;
