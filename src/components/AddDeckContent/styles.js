import styled from 'styled-components/native';

const ContentStyledView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const MessageStyledView = styled.View`
  flex: 1;
  width: 100%;
  margin: 25px auto;
`;

const MainStyledView = styled.View`
  top: 50px;
  flex: 1;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const MessageStyledText = styled.Text`
  text-transform: uppercase;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.theme.font.color.second};
  text-align: center;
  width: 100%;
  line-height: 25px;
`;
const MainContentStyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.background.color.first};
`;

const TitleStyledText = styled.Text`
  text-transform: uppercase;
  line-height: 16px;
  overflow: hidden;
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.fourth};
`;

export default {
  ContentStyledView,
  MessageStyledView,
  MainStyledView,
  MessageStyledText,
  MainContentStyledView,
  TitleStyledText,
};
