import styled from 'styled-components/native';

const ContentStyledView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const MessageStyledView = styled.View`
  margin: 10px auto;
`;

const MainStyledView = styled.View`
  width: 100%;

  position: absolute;
  bottom: 20%;
`;

const MessageStyledText = styled.Text`
  text-transform: uppercase;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.theme.font.color.second};
  text-align: center;
  margin-bottom: 5px;
`;
const MainContentStyledView = styled.View`
  margin-top: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleTextStyledView = styled.View`
  padding-bottom: 5px;
  width: 100%;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.border.color.first};
  margin-bottom: 10px;
`;

const TitleStyledText = styled.Text`
  text-transform: uppercase;
  line-height: 16px;
  overflow: hidden;
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.first};
`;

const ButtonStyledView = styled.View`
  align-items: center;
  margin-top: 10px;
`;

const ButtonStyled = styled.TouchableOpacity`
  padding: 5px;
  align-items: center;
  width: 150px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const ButtonStyledText = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.font.color.second};
`;

export default {
  ContentStyledView,
  MessageStyledView,
  MainStyledView,
  MessageStyledText,
  MainContentStyledView,
  TitleTextStyledView,
  TitleStyledText,
  ButtonStyledView,
  ButtonStyled,
  ButtonStyledText,
};
