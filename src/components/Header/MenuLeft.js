import React from 'react';
import styled from 'styled-components/native';
import MenuButton from '@components/MenuButton';

const MenuLeftStyled = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: 50px;
  align-self: center;
`;

const MenuLeft = (props) => {
  return (
    <MenuLeftStyled>
      <MenuButton {...props} />
    </MenuLeftStyled>
  );
};

export default MenuLeft;
