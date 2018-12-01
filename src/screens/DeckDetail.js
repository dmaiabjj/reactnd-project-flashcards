import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import DeckDetailContent from '@components/DeckDetailContent';
import Footer from '@components/Footer';

const DeckDetailStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class DeckDetail extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Detail',
  };

  render() {
    return (
      <DeckDetailStyled>
        <StatusBar />
        <Header {...this.props} />
        <DeckDetailContent />
        <Footer />
      </DeckDetailStyled>
    );
  }
}

export default DeckDetail;
