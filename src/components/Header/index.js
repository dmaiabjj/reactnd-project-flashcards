import React from 'react';
import Title from '@components/Header/Title';
import Styles from '@components/Header/styles';
import MenuLeft from '@components/Header/MenuLeft';

const Header = (props) => {
  return (
    <Styles.HeaderView>
      <MenuLeft {...props} />
      <Title />
    </Styles.HeaderView>
  );
};

export default Header;
