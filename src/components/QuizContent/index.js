import React from 'react';
import PropTypes from 'prop-types';
import Styles from '@components/QuizContent/styles';
import QuizCard, { QuizCardEmpty } from '@components/QuizCard';

const QuizContent = ({ quizzes }) => {
  const generateComponent = () => {
    const hasQuizzes = quizzes && quizzes.length > 0;

    if (hasQuizzes) {
      return quizzes.map((quizz, index) => (
        <QuizCard key={quizz.id} ranking={index} quizz={quizz} />
      ));
    }

    return <QuizCardEmpty />;
  };

  return <Styles.QuizStyledView>{generateComponent()}</Styles.QuizStyledView>;
};

QuizContent.propTypes = {
  quizzes: PropTypes.array,
};

export default QuizContent;
