import styled from 'styled-components/native';

const StatusBarStyledView = styled.View`
  height: ${(props) => {
    return props.size;
  }};
`;

export default { StatusBarStyledView };
