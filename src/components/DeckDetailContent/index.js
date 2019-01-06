import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import Styles from '@components/DeckDetailContent/styles';
import Loading from '@components/Loading';
import MainBackground from '@components/MainBackground';

import { Creators as DeckCreators, Selectors as DeckSelectors } from '@store/modules/decks';

const imageSrc = require('../../../assets/images/background.png');

class DeckDetailContent extends PureComponent {
  componentDidMount() {
    const {
      getDeckByTitle,
      deck: { title },
    } = this.props;
    getDeckByTitle(title);
  }

  onHandleDelete = (deck) => {
    const { deleteDeck, navigation } = this.props;
    Alert.alert(
      `Delete ${deck.title}`,
      'Are you sure?',
      [
        {
          text: 'Confirm',
          onPress: () => {
            deleteDeck(deck).then(() => navigation.navigate('Add'));
          },
        },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  render() {
    const { theme, app, deck, navigation } = this.props;
    return (
      <Styles.ContentStyledView>
        <MainBackground imageSrc={imageSrc} />
        {deck && (
          <Styles.MessageStyledView>
            <Styles.MessageStyledText
              size={theme.font.size.third}
              weight={theme.font.weight.second}
            >
              {deck.title}
            </Styles.MessageStyledText>
            <Styles.MessageStyledText
              size={theme.font.size.first}
              weight={theme.font.weight.second}
            >
              {deck.questions.length} Card(s)
            </Styles.MessageStyledText>
          </Styles.MessageStyledView>
        )}

        {!app.fetched && <Loading color={theme.font.color.first} />}
        {app.fetched && (
          <Styles.MainStyledView>
            <Styles.MainContentStyledView>
              <Styles.ButtonStyledView>
                <Styles.ButtonStyled
                  color={theme.background.color.second}
                  onPress={() => navigation.navigate('Card', { deck })}
                >
                  <Styles.ButtonStyledText color={theme.font.color.second}>
                    Add Card
                  </Styles.ButtonStyledText>
                </Styles.ButtonStyled>
              </Styles.ButtonStyledView>
              <Styles.ButtonStyledView>
                <Styles.ButtonStyled
                  style={{ borderWidth: 2, borderColor: theme.background.color.third }}
                  color={theme.background.color.first}
                >
                  <Styles.ButtonStyledText color={theme.font.color.first}>
                    Start Quiz
                  </Styles.ButtonStyledText>
                </Styles.ButtonStyled>
              </Styles.ButtonStyledView>
              <Styles.ButtonStyledView>
                <Styles.ButtonStyled color="red" onPress={() => this.onHandleDelete(deck)}>
                  <Styles.ButtonStyledText color={theme.font.color.second}>
                    Delete
                  </Styles.ButtonStyledText>
                </Styles.ButtonStyled>
              </Styles.ButtonStyledView>
            </Styles.MainContentStyledView>
          </Styles.MainStyledView>
        )}
      </Styles.ContentStyledView>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { app } = state;
  const deck = DeckSelectors.getBytTitle(ownProps.deck.title)(state);
  return {
    app,
    deck,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDeckByTitle: (title) => dispatch(DeckCreators.fetchByTitle(title)),
    deleteDeck: (deck) => dispatch(DeckCreators.delete(deck)),
  };
}

DeckDetailContent.propTypes = {
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  deck: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  getDeckByTitle: PropTypes.func.isRequired,
  deleteDeck: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(DeckDetailContent));
