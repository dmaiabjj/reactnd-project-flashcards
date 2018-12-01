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
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.theme.font.color.second};
  text-align: center;
  width: 100%;
  line-height: 25px;
`;
const MainContentStyledView = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background.color.first};
`;

export default {
  ContentStyledView,
  MessageStyledView,
  MainStyledView,
  MessageStyledText,
  MainContentStyledView,
};
