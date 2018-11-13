import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import _ from 'lodash';
import Styles from '@components/DeckCard/styles';

class DeckCard extends PureComponent {
  render() {
    const { deck, theme } = this.props;
    const score = deck.score;
    const colors = [
      { score: 50, color: '#ff0000' },
      { score: 70, color: '#ffc107' },
      { score: 100, color: theme.font.color.fourth },
    ];
    const color = _.get(
      _.find(colors, (c) => {
        return score <= c.score;
      }),
      'color',
      theme.font.color.fourth,
    );

    return (
      <Styles.CardStyledView>
        <Styles.CardTitleStyledText>{deck.name}</Styles.CardTitleStyledText>
        <Styles.CardDescriptionStyledText>{deck.cards} card(s)</Styles.CardDescriptionStyledText>
        <Styles.CardQuizScoreStyledView>
          <Styles.QuizScoreStyledText>Score: </Styles.QuizScoreStyledText>
          <Styles.QuizScoreStyledText style={[{ color, fontWeight: '500' }]}>
            {score}
          </Styles.QuizScoreStyledText>
          <Styles.QuizScoreStyledText style={[{ marginRight: 5 }]}>/100</Styles.QuizScoreStyledText>
          <AnimatedCircularProgress
            size={20}
            width={2}
            fill={score}
            tintColor={color}
            backgroundColor={theme.shadow.color.first}
          />
        </Styles.CardQuizScoreStyledView>
      </Styles.CardStyledView>
    );
  }
}

DeckCard.propTypes = {
  theme: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
};

export default withTheme(DeckCard);
