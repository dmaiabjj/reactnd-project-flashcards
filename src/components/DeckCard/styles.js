import styled from 'styled-components/native';

const CardStyledView = styled.View`
  border: 1px solid ${(props) => props.theme.border.color.first};
  background: ${(props) => props.theme.background.color.first};
  border-radius: 10px;
  padding: 15px;
  margin: 40px 0 10px 0;
  flex: 1;
  flex-flow: column wrap;
  justify-content: space-between;
  box-shadow: 5px 5px 5px ${(props) => props.theme.shadow.color.first};
`;

const CardTitleStyledText = styled.Text`
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.third};
  align-self: center;
  text-align: center;
  text-transform: uppercase;
  height: 50px;
`;

const CardDescriptionStyledText = styled.Text`
  color: ${(props) => props.theme.font.color.fifth};
  font-size: ${(props) => props.theme.font.size.first};
  margin-top: 5px;
`;

const CardQuizScoreStyledView = styled.View`
  align-self: flex-end;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const QuizScoreStyledText = styled.Text`
  color: ${(props) => props.theme.font.color.fifth};
  font-size: ${(props) => props.theme.font.size.first};
`;

export default {
  CardStyledView,
  CardTitleStyledText,
  CardDescriptionStyledText,
  CardQuizScoreStyledView,
  QuizScoreStyledText,
};
