import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import AddDeckContent from '@components/AddDeckContent';
import Footer from '@components/Footer';

const AddDeckStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class AddDeck extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <AddDeckStyled>
        <StatusBar />
        <Header navigation={navigation} />
        <AddDeckContent navigation={navigation} />
        <Footer />
      </AddDeckStyled>
    );
  }
}

AddDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddDeck;
