import styled from 'styled-components/native';

const StatusBarView = styled.View`
  height: ${(props) => {
    return props.size;
  }};
`;

export default { StatusBarView };
