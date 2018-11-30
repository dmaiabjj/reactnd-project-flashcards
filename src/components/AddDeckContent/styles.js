import styled from 'styled-components/native';

const ContentStyledView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const MessageStyledView = styled.View`
  width: 100%;
  margin: 25px auto;
`;

const MainStyledView = styled.View`
  top: 50px;
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
  margin-top: 50;
  position: relative;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex: 1;
`;

const TitleTextStyledView = styled.View`
  flex: 1;
  padding-bottom: 5px;
  width: 90%;
  align-items: center;
  margin-bottom: 50;
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

const DeckSubjectStyledView = styled.View`
  flex: 1;
  margin-bottom: 20;
`;

const DeckSubjectStyledText = styled.TextInput`
  color: ${(props) => props.theme.input.color.first};
  margin: 20px 15px 20px 15px;
  font-size: 20px;
  width: 100%;
  text-align: center;
`;

const AddButtonStyledView = styled.View`
  flex: 1;
  height: 100%;
`;

const AddButtonStyled = styled.TouchableOpacity`
  padding: 5px;
  align-items: center;
  width: 150;
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
  DeckSubjectStyledView,
  DeckSubjectStyledText,
  AddButtonStyledView,
  AddButtonStyled,
  AddButtonStyledText,
};
