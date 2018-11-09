import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import MainContent from '@components/MainContent';
import Footer from '@components/Footer';
import { Text } from 'react-native';

const HomeStyled = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
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
        <MainContent>
          <Text>AAAAA</Text>
          <Footer />
        </MainContent>
      </HomeStyled>
    );
  }
}

export default Home;
