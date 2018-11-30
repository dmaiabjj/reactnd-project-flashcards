import styled from 'styled-components/native';

const BackgroundStyledView = styled.View`
  height: 170px;
  background: ${(props) => props.theme.background.color.second};
  width: 100%;
  position: absolute;
`;

const BackgroundStyledImage = styled.Image`
  flex: 1;
  opacity: 0.5;
  width: 100%;
`;

export default {
  BackgroundStyledView,
  BackgroundStyledImage,
};
