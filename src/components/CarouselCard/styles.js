import styled from 'styled-components/native';

const CaroseulStyledView = styled.View`
  width: ${(props) => props.width};
  align-items: center;
`;

const CardStyledView = styled.View`
  border: 1px solid ${(props) => props.theme.border.color.first};
  background: ${(props) => props.theme.background.color.first};
  border-radius: 10px;
  padding: 15px;
  margin: 40px 0 10px 0;
  box-shadow: 5px 5px 5px ${(props) => props.theme.shadow.color.first};
  width: 90%;
`;

const CardTitleStyledText = styled.Text`
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.third};
  text-transform: uppercase;
`;

export default {
  CaroseulStyledView,
  CardStyledView,
  CardTitleStyledText,
};
