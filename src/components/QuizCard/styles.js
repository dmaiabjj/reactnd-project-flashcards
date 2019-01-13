import styled from 'styled-components/native';

const DescriptionCardStyledView = styled.View`
  width: 100%;
  border-top-width: 1px;
  padding: 10px 15px;
  border-top-color: ${(props) => props.theme.border.color.first};
  background: ${(props) => props.theme.background.color.first};
`;

const DescriptionCardTitleStyledText = styled.Text`
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.third};
  text-transform: uppercase;
`;

const DescriptionCardDateStyledText = styled.Text`
  color: ${(props) => props.theme.font.color.fifth};
  font-size: ${(props) => props.theme.font.size.first};
`;

export default {
  DescriptionCardStyledView,
  DescriptionCardTitleStyledText,
  DescriptionCardDateStyledText,
};
