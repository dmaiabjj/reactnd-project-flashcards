import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import StatusBar from '@components/StatusBar/StatusBar';

const HomeStyled = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  align-items: center;
`;

class Home extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Deck',
  };

  render() {
    return (
      <HomeStyled>
        <StatusBar />
        <Header {...this.props} />
      </HomeStyled>
    );
  }
}

export default Home;
