import styled from 'styled-components/native';

const HeaderStyledView = styled.View`
  background: ${(props) => props.theme.background.color.first};
  flex-flow: row nowrap;
  height: 50px;
  border-radius: 1px;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.font.color.first};
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
  color: ${(props) => props.theme.font.color.first};
  font-family: ${(props) => props.theme.font.family.first};
  font-weight: bold;
`;

export default {
  HeaderStyledView,
  MenuLeftStyledView,
  MenuButtonStyledTouchable,
  TitleStyledView,
  TitleStyledText,
};
