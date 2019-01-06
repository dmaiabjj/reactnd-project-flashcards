import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';

import Header from '@components/Header';
import DeckDetailContent from '@components/DeckDetailContent';

const DeckDetailStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class DeckDetail extends PureComponent {
  static navigationOptions = ({ screenProps: { theme } }) => {
    return {
      title: 'Deck Details',
      headerStyle: {
        backgroundColor: theme.background.color.first,
      },
      headerTintColor: theme.font.color.first,
    };
  };

  render() {
    const {
      navigation,
      navigation: {
        state: {
          params: { deck },
        },
      },
    } = this.props;
    return (
      <DeckDetailStyled>
        <Header navigation={navigation} />
        <DeckDetailContent deck={deck} navigation={navigation} />
      </DeckDetailStyled>
    );
  }
}

DeckDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withTheme(DeckDetail);
