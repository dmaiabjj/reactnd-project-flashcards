import styled from 'styled-components/native';

const ContentStyledView = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background.color.first};
  text-align: center;
  width: 100%;
  line-height: 25px;
  padding-top: ${(props) => props.topSize};
`;

const DrawerItemStyledView = styled.View`
  margin: 10px;
`;

const DrawerItemStyledText = styled.Text`
  line-height: 16px;
  overflow: hidden;
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.first};
`;

export default {
  ContentStyledView,
  DrawerItemStyledView,
  DrawerItemStyledText,
};
