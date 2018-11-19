import styled from 'styled-components/native';

const HomeContentStyledView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const BackgroundStyledView = styled.View`
  height: 170px;
  background: ${(props) => props.theme.background.color.second};
  width: 100%;
  position: absolute;
`;

const BackgroundStyledImage = styled.Image`
  flex: 1;
  opacity: 0.5;
  width: 100%;
`;

const MessageStyledView = styled.View`
  flex: 1;
  width: 100%;
  margin: 25px auto;
`;

const MessageStyledText = styled.Text`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.theme.font.color.second};
  text-align: center;
  width: 100%;
  line-height: 25px;
`;
const ContentStyledView = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background.color.first};
`;

const QuizTitleStyledText = styled.Text`
  margin: 0px 15px 20px 15px;
  text-transform: uppercase;
  line-height: 16px;
  overflow: hidden;
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.first};
`;

export default {
  HomeContentStyledView,
  BackgroundStyledView,
  BackgroundStyledImage,
  MessageStyledView,
  MessageStyledText,
  ContentStyledView,
  QuizTitleStyledText,
};
