import React, { PureComponent } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import Styles from '@components/QuizExecutionCard/styles';

class QuizExecutionCard extends PureComponent {
  animatedValue = new Animated.Value(0);

  value = 0;

  frontInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  backInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  componentDidMount() {
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
  }

  componentWillUnmount() {
    this.animatedValue.removeAllListeners();
  }

  flip() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    };

    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    };

    const { card } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.flip()}>
        <Styles.CardStyledMainView>
          <Styles.CardStyledView isQuestion style={[frontAnimatedStyle]}>
            <Styles.CardTitleStyledView>
              <Styles.CardTitleStyledText>Question</Styles.CardTitleStyledText>
            </Styles.CardTitleStyledView>
            <Styles.CardDescriptionStyledText>{card.question}</Styles.CardDescriptionStyledText>
          </Styles.CardStyledView>
          <Styles.CardStyledView style={[backAnimatedStyle]}>
            <Styles.CardTitleStyledView>
              <Styles.CardTitleStyledText>Answer</Styles.CardTitleStyledText>
            </Styles.CardTitleStyledView>
            <Styles.CardDescriptionStyledText>{card.answer}</Styles.CardDescriptionStyledText>
          </Styles.CardStyledView>
        </Styles.CardStyledMainView>
      </TouchableWithoutFeedback>
    );
  }
}

QuizExecutionCard.propTypes = {
  card: PropTypes.object.isRequired,
};
export default QuizExecutionCard;
