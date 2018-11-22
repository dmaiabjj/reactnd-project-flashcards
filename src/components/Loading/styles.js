import styled from 'styled-components/native';

const LoadingStyledView = styled.View`
  background: ${(props) => props.theme.background.color.first};
  justify-content: center;
  align-content: center;
  flex: 8;
`;

const LoadingStyledText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.font.color.third};
  text-transform: uppercase;
`;

export default {
  LoadingStyledView,
  LoadingStyledText,
};
