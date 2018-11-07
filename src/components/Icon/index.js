import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

const IconStyled = styled.View``;

const Icon = ({ container, font }) => {
  return (
    <IconStyled {...container}>
      <FontAwesome {...font} />
    </IconStyled>
  );
};

export default Icon;
