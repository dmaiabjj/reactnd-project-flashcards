import styled from 'styled-components/native';
import colors from '@styles/settings/colors';

const HeaderView = styled.View`
  background: ${colors.primary};
  width: 100%;
  height: 50px;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const MenuLeftView = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: 50px;
  align-self: center;
`;

const MenuButtonTouchable = styled.TouchableOpacity``;

const TitleView = styled.View`
  flex-grow: 8;
  height: 50px;
  flex-flow: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  margin-right: 10px;
`;

const TitleText = styled.Text`
  flex-grow: 1;
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
