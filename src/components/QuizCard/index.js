import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Styles from '@components/QuizCard/styles';

class QuizCard extends PureComponent {
  render() {
    const { quizz } = this.props;

    return (
      <Styles.DescriptionCardStyledView>
        <Styles.DescriptionCardTitleStyledText>{quizz.name}</Styles.DescriptionCardTitleStyledText>
        <Styles.DescriptionCardDateStyledText>
          Start Date: {quizz.date}
        </Styles.DescriptionCardDateStyledText>
      </Styles.DescriptionCardStyledView>
    );
  }
}

const QuizCardEmpty = () => {
  return (
    <Styles.DescriptionCardStyledView>
      <Styles.DescriptionCardTitleStyledText style={{ textTransform: 'none', textAlign: 'center' }}>
        This deck does not have any quizzes yet!!!
      </Styles.DescriptionCardTitleStyledText>
    </Styles.DescriptionCardStyledView>
  );
};

QuizCard.propTypes = {
  theme: PropTypes.object.isRequired,
  quizz: PropTypes.object.isRequired,
};

export { QuizCardEmpty };
export default withTheme(QuizCard);
