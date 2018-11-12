import styled from 'styled-components/native';
import colors from '@styles/settings/colors';

const HeaderView = styled.View`
  background: ${colors.primary};
  flex-flow: row nowrap;
  height: 50px;
`;

const MenuLeftView = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const MenuButtonTouchable = styled.TouchableOpacity``;

const TitleView = styled.View`
  flex-grow: 8;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  color: ${colors.zero};
  font-family: Roboto;
  font-weight: bold;
`;

export default {
  HeaderView,
  MenuLeftView,
  MenuButtonTouchable,
  TitleView,
  TitleText,
};
