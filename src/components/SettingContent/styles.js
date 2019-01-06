import styled from 'styled-components/native';

const ContentStyledView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.background.color.third};
`;

const TitleTextStyledView = styled.View`
  margin-top: 10;
  margin-bottom: 50;
`;

const TitleStyledText = styled.Text`
  text-transform: uppercase;
  line-height: 16px;
  overflow: hidden;
  font-size: ${(props) => props.theme.font.size.first};
  font-weight: ${(props) => props.theme.font.weight.second};
  color: ${(props) => props.theme.font.color.first};
`;

export default {
  ContentStyledView,
  TitleTextStyledView,
  TitleStyledText,
};
