import styled from 'styled-components/native';
import { Animated } from 'react-native';

const CardStyledMainView = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const CardStyledView = styled(Animated.View)`
  border: 3px solid ${(props) => props.theme.border.color.first};
  background: ${(props) => props.theme.background.color.first};
  border-radius: 10px;
  margin: 0px 0 10px 0;
  flex-flow: column wrap;
  height: 250px;
  box-shadow: 5px 5px 5px ${(props) => props.theme.shadow.color.first};
  width: 90%;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
`;

const CardTitleStyledView = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-style: solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: ${(props) => props.theme.border.color.first};
  background: ${(props) => props.theme.shadow.color.second};
  height: 53px;
  margin: 0 0 10px 0;
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

const ButtonStyledView = styled.View`
  align-items: center;
  position: absolute;
  bottom: 45%;
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
  CardStyledMainView,
  CardStyledView,
  CardTitleStyledView,
  CardTitleStyledText,
  CardDescriptionStyledText,
  ButtonStyledView,
  ButtonStyled,
  ButtonStyledText,
};
