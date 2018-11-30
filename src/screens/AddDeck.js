import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import AddDeckContent from '@components/AddDeckContent';
import Footer from '@components/Footer';

const AddDeckStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class AddDeck extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Add Deck',
  };

  render() {
    return (
      <AddDeckStyled>
        <StatusBar />
        <Header {...this.props} />
        <AddDeckContent />
        <Footer />
      </AddDeckStyled>
    );
  }
}

export default AddDeck;
