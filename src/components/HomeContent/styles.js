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
`;

const BackgroundStyledImage = styled.Image`
  flex: 1;
  position: absolute;
  resize-mode: cover;
  opacity: 0.5;
  width: 100%;
`;

const MessageStyledView = styled.View`
  flex: 1;
  position: absolute;
  text-align: center;
  margin: 25px auto;
`;

const MessageStyledText = styled.Text`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.theme.font.color.second};
  margin: 0 40% 0 40%;
  text-align: center;
  width: 100%;
  transform: translateX(-50px);
  line-height: 25px;
`;

const CardStyledView = styled.View`
  border: 0px solid ${(props) => props.theme.border.color.first};
  background: ${(props) => props.theme.background.color.first};
  border-radius: 10px;
  height: 120px;
  padding: 15px;
  margin: 40px 0 0 0;
  flex: 1;
  flex-flow: column;
  justify-content: space-around;
`;

const CardTitleStyledText = styled.Text`
  font-size: ${(props) => props.theme.font.size.first};
  line-height: 18px;
  font-weight: 400;
  color: ${(props) => props.theme.font.color.third};
`;

const CardDescriptionStyledText = styled.Text`
  color: ${(props) => props.theme.font.color.fourth};
  font-size: ${(props) => props.theme.font.size.second};
`;

export default {
  HomeContentStyledView,
  BackgroundStyledView,
  BackgroundStyledImage,
  MessageStyledView,
  MessageStyledText,
  CardStyledView,
  CardTitleStyledText,
  CardDescriptionStyledText,
};
