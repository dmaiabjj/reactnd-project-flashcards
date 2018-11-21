import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Styles from '@components/DeckCard/styles';
import ScoreGauge from '@components/ScoreGauge';

import _ from 'lodash';

class DeckCard extends PureComponent {
  calcScore = () => {
    const {
      deck: { quizzes },
    } = this.props;

    return quizzes.length > 0 ? _.meanBy(quizzes, (q) => q.points) : 0;
  };

  render() {
    const { deck, theme } = this.props;

    return (
      <Styles.CardStyledView>
        <Styles.CardTitleStyledView>
          <Styles.CardTitleStyledText>{deck.title}</Styles.CardTitleStyledText>
        </Styles.CardTitleStyledView>
        <Styles.CardDescriptionStyledText>
          {deck.questions.length} card(s)
        </Styles.CardDescriptionStyledText>
        <ScoreGauge score={this.calcScore()} theme={theme} style={{ justifyContent: 'center' }} />
      </Styles.CardStyledView>
    );
  }
}

DeckCard.propTypes = {
  theme: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
};

export default withTheme(DeckCard);
