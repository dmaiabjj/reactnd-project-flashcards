import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Styles from '@components/DeckCard/styles';
import ScoreGauge from '@components/ScoreGauge';

class DeckCard extends PureComponent {
  render() {
    const { deck, theme } = this.props;

    return (
      <Styles.CardStyledView>
        <Styles.CardTitleStyledView>
          <Styles.CardTitleStyledText>{deck.name}</Styles.CardTitleStyledText>
        </Styles.CardTitleStyledView>
        <Styles.CardDescriptionStyledText>{deck.cards} card(s)</Styles.CardDescriptionStyledText>
        <ScoreGauge score={deck.score} theme={theme} style={{ justifyContent: 'center' }} />
      </Styles.CardStyledView>
    );
  }
}

DeckCard.propTypes = {
  theme: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
};

export default withTheme(DeckCard);
