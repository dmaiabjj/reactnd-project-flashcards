import styled from 'styled-components/native';

const StatusBarView = styled.View`
  align-items: center;
  justify-content: center;
  height: ${(props) => {
    return props.size;
  }};
`;

export default { StatusBarView };
