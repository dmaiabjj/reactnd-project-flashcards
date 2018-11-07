import React from 'react';
import styled from 'styled-components/native';
import MenuLeft from '@components/MenuLeft';
import Title from '@components/Title';
import colors from '@styles/settings/colors';

const HeaderStyled = styled.View`
  background: ${colors.primary};
  width: 100%;
  height: 50px;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Header = (props) => {
  return (
    <HeaderStyled>
      <MenuLeft {...props} />
      <Title />
    </HeaderStyled>
  );
};

export default Header;
