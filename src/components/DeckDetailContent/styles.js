import styled from 'styled-components/native';

const ContentStyledView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const MessageStyledView = styled.View`
  width: 100%;
  margin: 60px auto;
`;

const MainStyledView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const MessageStyledText = styled.Text`
  text-transform: uppercase;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.theme.font.color.second};
  text-align: center;
  line-height: 25px;
  margin-bottom: 5px;
`;
const MainContentStyledView = styled.View``;

const ButtonStyledView = styled.View`
  align-self: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const ButtonStyled = styled.TouchableOpacity`
  padding: 5px;
  align-items: center;
  width: 150;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const ButtonStyledText = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color};
`;
export default {
  ContentStyledView,
  MessageStyledView,
  MainStyledView,
  MessageStyledText,
  MainContentStyledView,
  ButtonStyledView,
  ButtonStyled,
  ButtonStyledText,
};
