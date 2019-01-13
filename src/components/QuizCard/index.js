import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Styles from '@components/QuizCard/styles';
import ScoreGauge from '@components/ScoreGauge';

class QuizCard extends PureComponent {
  /**
   * @description Recebe o timestamp e tranforma em uma data com formato legivel
   * @param {number} timestamp
   * @returns {string} Data formatada
   */
  formatDate = (timestamp) => {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString('en-US');
    return `${time.substr(0, 5) + time.slice(-2)} | ${d.toLocaleDateString()}`;
  };

  render() {
    const { quizz, theme, ranking } = this.props;
    return (
      <Styles.DescriptionCardStyledView>
        <Styles.DescriptionCardTitleStyledText>
          Ranked #{ranking + 1}
        </Styles.DescriptionCardTitleStyledText>
        <Styles.DescriptionCardDateStyledText>
          Start Date: {this.formatDate(quizz.timestamp)}
        </Styles.DescriptionCardDateStyledText>
        <ScoreGauge points={quizz.points} theme={theme} />
      </Styles.DescriptionCardStyledView>
    );
  }
}

const QuizCardEmpty = () => {
  return (
    <Styles.DescriptionCardStyledView>
      <Styles.DescriptionCardTitleStyledText style={{ textTransform: 'none', textAlign: 'center' }}>
        No quizzes at all!
      </Styles.DescriptionCardTitleStyledText>
    </Styles.DescriptionCardStyledView>
  );
};

QuizCard.propTypes = {
  theme: PropTypes.object.isRequired,
  quizz: PropTypes.object.isRequired,
  ranking: PropTypes.number.isRequired,
};

export { QuizCardEmpty };
export default withTheme(QuizCard);
