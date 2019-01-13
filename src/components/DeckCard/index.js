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
    const { deck, theme, navigation } = this.props;
    return (
      <Styles.CardStyledTouchableOpacity
        onPress={() => navigation.navigate('DeckDetail', { deck })}
      >
        <Styles.CardTitleStyledView>
          <Styles.CardTitleStyledText>{deck.title}</Styles.CardTitleStyledText>
        </Styles.CardTitleStyledView>
        <Styles.CardDescriptionStyledText>
          {deck.questions.length} card(s)
        </Styles.CardDescriptionStyledText>
        <ScoreGauge points={this.calcScore()} theme={theme} style={{ justifyContent: 'center' }} />
      </Styles.CardStyledTouchableOpacity>
    );
  }
}

DeckCard.propTypes = {
  theme: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withTheme(DeckCard);
