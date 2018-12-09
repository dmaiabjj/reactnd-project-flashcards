import styled from 'styled-components/native';

const CardStyledView = styled.View`
  border: 3px solid ${(props) => props.theme.border.color.first};
  background: ${(props) => props.theme.background.color.first};
  border-radius: 10px;
  margin: 70px 0 5px 0;
  flex: 1;
  flex-flow: column;
  box-shadow: 5px 5px 5px ${(props) => props.theme.shadow.color.first};
  height: 150px;
  overflow: hidden;
`;

const CardTitleStyledView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom-width: 1px;
  border-style: solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: ${(props) => props.theme.border.color.first};
  background: ${(props) => props.theme.shadow.color.second};
  height: 53px;
  margin: 0 0 10px 0;
  width: 100%;
  box-shadow: 5px 5px 5px ${(props) => props.theme.shadow.color.first};
`;

const CardTitleStyledText = styled.Text`
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.third};
  text-align: center;
  text-transform: uppercase;
`;

const CardDescriptionStyledText = styled.Text`
  color: ${(props) => props.theme.font.color.fifth};
  font-size: ${(props) => props.theme.font.size.first};
  text-align: center;
`;

const RemoveButtonStyled = styled.TouchableOpacity``;

export default {
  CardStyledView,
  CardTitleStyledView,
  CardTitleStyledText,
  CardDescriptionStyledText,
  RemoveButtonStyled,
};
