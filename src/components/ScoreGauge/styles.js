import styled from 'styled-components/native';

const CardQuizScoreStyledView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const QuizScoreStyledText = styled.Text`
  color: ${(props) => props.theme.font.color.fifth};
  font-size: ${(props) => props.theme.font.size.first};
`;

export default {
  CardQuizScoreStyledView,
  QuizScoreStyledText,
};
