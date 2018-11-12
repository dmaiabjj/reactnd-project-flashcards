import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import HomeContent from '@components/HomeContent';
import Footer from '@components/Footer';

const HomeStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.first};
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
        <HomeContent />
        <Footer />
      </HomeStyled>
    );
  }
}

export default Home;
