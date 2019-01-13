import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
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

  state = {
    text: 'Answer',
  };

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
      this.setState({ text: 'Answer' });
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      this.setState({ text: 'Question' });
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

    const { card, theme } = this.props;
    const { text } = this.state;
    return (
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
        <Styles.ButtonStyledView>
          <Styles.ButtonStyled color={theme.background.color.sixth} onPress={() => this.flip()}>
            <Styles.ButtonStyledText color={theme.font.color.second}>
              {text}
            </Styles.ButtonStyledText>
          </Styles.ButtonStyled>
        </Styles.ButtonStyledView>
      </Styles.CardStyledMainView>
    );
  }
}

QuizExecutionCard.propTypes = {
  card: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default QuizExecutionCard;
