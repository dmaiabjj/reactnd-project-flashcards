import React from 'react';
import styled from 'styled-components/native';
import colors from '@styles/settings/colors';
import Icon from '@components/Icon';

const TitleContainerStyled = styled.View`
  flex-grow: 8;
  height: 50px;
  flex-flow: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
`;

const TitleStyled = styled.Text`
  flex-grow: 1;
  color: ${colors.zero};
  font-family: Roboto;
  font-weight: bold;
`;

const Title = () => {
  return (
    <TitleContainerStyled>
      <Icon
        font={{ name: 'book', size: 24, style: { color: colors.zero } }}
        container={{
          flexGrow: 1,
          justifyContent: 'center',
          height: '100%',
          alignItems: 'flex-end',
          marginRight: '5%',
        }}
      />
      <TitleStyled>FLASHCARDS</TitleStyled>
    </TitleContainerStyled>
  );
};

export default Title;
