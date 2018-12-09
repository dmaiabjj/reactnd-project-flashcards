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
  top: 50px;
  position: absolute;
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

const TitleTextStyledView = styled.View`
  flex: 1;
  padding-bottom: 5px;
  width: 100%;
  align-items: center;
  margin-bottom: 20;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.border.color.first};
`;

const TitleStyledText = styled.Text`
  text-transform: uppercase;
  line-height: 16px;
  overflow: hidden;
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.first};
`;

const CardSubjectStyledView = styled.View`
  flex: 1;
`;

const CardSubjectStyledText = styled.TextInput`
  color: ${(props) => props.theme.input.color.first};
  margin: 10px 15px 10px 15px;
  font-size: 20px;
  text-align: center;
  border: 1px solid;
  border-radius: 10px;
  height: 100px;
`;

const CardSubjectErrorStyledText = styled.TextInput`
  color: red;
  font-size: 15px;
  text-align: center;
`;

const AddButtonStyledView = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 10;
`;

const AddButtonStyled = styled.TouchableOpacity`
  padding: 5px;
  align-items: center;
  width: 150;
  border-radius: 5px;
  background-color: ${(props) => props.theme.background.color.second};
`;

const AddButtonStyledText = styled.Text`
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
  CardSubjectStyledView,
  CardSubjectStyledText,
  CardSubjectErrorStyledText,
  AddButtonStyledView,
  AddButtonStyled,
  AddButtonStyledText,
};
