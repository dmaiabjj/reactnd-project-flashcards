import styled from 'styled-components/native';
import base from '@styles/base';

const HeaderStyledView = styled.View`
  background: ${(props) => props.theme.background.first};
  flex-flow: row nowrap;
  height: 50px;
  border-radius: 1px;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.fonts.first};
`;

const MenuLeftStyledView = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const MenuButtonStyledTouchable = styled.TouchableOpacity``;

const TitleStyledView = styled.View`
  flex-grow: 8;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;

const TitleStyledText = styled.Text`
  color: ${(props) => props.theme.fonts.first};
  font-family: ${base.FontFamily};
  font-weight: bold;
`;

export default {
  HeaderStyledView,
  MenuLeftStyledView,
  MenuButtonStyledTouchable,
  TitleStyledView,
  TitleStyledText,
};
