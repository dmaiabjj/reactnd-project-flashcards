import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Styles from '@components/ScoreGauge/styles';

const ScoreGauge = ({ points, theme, style }) => {
  const colors = [
    { score: 50, color: '#ff0000' },
    { score: 70, color: '#ffc107' },
    { score: 100, color: theme.font.color.fourth },
  ];

  const color = _.get(
    _.find(colors, (c) => {
      return points <= c.score;
    }),
    'color',
    theme.font.color.fourth,
  );

  return (
    <Styles.CardQuizScoreStyledView {...style}>
      <Styles.QuizScoreStyledText>Score: </Styles.QuizScoreStyledText>
      <Styles.QuizScoreStyledText style={[{ color, fontWeight: '500' }]}>
        {points}
      </Styles.QuizScoreStyledText>
      <Styles.QuizScoreStyledText style={[{ marginRight: 5 }]}>/100</Styles.QuizScoreStyledText>
      <AnimatedCircularProgress
        size={20}
        width={2}
        fill={points}
        tintColor={color}
        backgroundColor={theme.shadow.color.first}
      />
    </Styles.CardQuizScoreStyledView>
  );
};

ScoreGauge.propTypes = {
  points: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ScoreGauge;
