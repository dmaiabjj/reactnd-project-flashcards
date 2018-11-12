import styled from 'styled-components/native';

const HomeContentStyledView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const BackgroundStyledView = styled.View`
  height: 170px;
  background: ${(props) => props.theme.background.primary};
`;

const BackgroundStyledImage = styled.Image`
  flex: 1;
  position: absolute;
  resize-mode: cover;
  opacity: 0.5;
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
  color: ${(props) => props.theme.fonts.zero};
  margin: 0 40% 0 40%;
  text-align: center;
  width: 100%;
  transform: translateX(-50px);
`;

export default {
  HomeContentStyledView,
  BackgroundStyledView,
  BackgroundStyledImage,
  MessageStyledView,
  MessageStyledText,
};
