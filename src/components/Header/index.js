import React from 'react';
import Title from '@components/Header/Title';
import Styles from '@components/Header/styles';
import MenuLeft from '@components/Header/MenuLeft';

const Header = (props) => {
  return (
    <Styles.HeaderStyledView>
      <MenuLeft {...props} />
      <Title />
    </Styles.HeaderStyledView>
  );
};

export default Header;
