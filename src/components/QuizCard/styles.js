import styled from 'styled-components/native';

const DescriptionCardStyledView = styled.View`
  flex: 1;
  width: 100%;
  border-width: 1px 0 1px 0;
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: ${(props) => props.theme.background.color.first};
`;

const DescriptionCardTitleStyledText = styled.Text`
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.third};
  text-transform: uppercase;
`;

const DescriptionCardDateStyledText = styled.Text`
  margin-top: 5px;
  color: ${(props) => props.theme.font.color.fifth};
  font-size: ${(props) => props.theme.font.size.first};
`;

export default {
  DescriptionCardStyledView,
  DescriptionCardTitleStyledText,
  DescriptionCardDateStyledText,
};
