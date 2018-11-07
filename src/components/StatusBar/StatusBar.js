import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';

const StatusBarStyled = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: ${(props) => props.size};
`;

const MenuButton = () => {
  return (
    <StatusBarStyled size={Constants.statusBarHeight}>
      <StatusBar />
    </StatusBarStyled>
  );
};

export default MenuButton;
