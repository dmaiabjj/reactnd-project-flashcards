import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import { Alert } from 'react-native';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import Styles from '@components/QuizExecution/styles';
import QuizExecutionCard from '@components/QuizExecutionCard';
import Loading from '@components/Loading';
import MainBackground from '@components/MainBackground';

import { Selectors as QuestionSelectors } from '@store/modules/questions';
import { Creators as QuizCreators } from '@store/modules/quizzes';

const imageSrc = require('../../../assets/images/background.png');

class QuizExecution extends PureComponent {
  INITIAL_STATE = { index: 0, questions: [], score: 0 };

  state = this.INITIAL_STATE;

  onHandleFinishQuiz = (score, total, points) => {
    const { navigation } = this.props;
    const title = points >= 50 ? 'Congratulations' : 'Sorry - Best luck next time';
    Alert.alert(
      title,
      `You score ${score} of ${total} achieving ${points} point(s)`,
      [
        {
          text: 'Try again',
          onPress: () => {
            this.setState(this.INITIAL_STATE);
          },
        },
        {
          text: 'Go to Home',
          onPress: () => {
            navigation.navigate('Add');
          },
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  onHandleAction(hit) {
    const { cards } = this.props;
    const { index } = this.state;
    const card = cards[index];
    this.setState((prevState) => {
      return {
        ...prevState,
        ...{
          index: prevState.index + 1 >= cards.length ? prevState.index : prevState.index + 1,
          questions: [...prevState.questions, { ...card, hit }],
          score: prevState.score + (hit ? 1 : 0),
        },
      };
    }, this.finish);
  }

  finish() {
    const { cards } = this.props;
    const { index } = this.state;
    if (index + 1 >= cards.length) {
      const { deck, addQuizz } = this.props;
      const { questions, score } = this.state;
      const points = (score / questions.length) * 100;
      const quiz = { id: uuid(), questions, points, timestamp: Date.now() };
      addQuizz(deck.title, quiz);
      this.onHandleFinishQuiz(score, questions.length, points);
    }
  }

  render() {
    const { theme, app, cards, deck } = this.props;
    const { index } = this.state;
    const card = cards[index];
    return (
      <Styles.ContentStyledView>
        <MainBackground imageSrc={imageSrc} />
        <Styles.MessageStyledView>
          <Styles.MessageStyledText size={theme.font.size.second} weight={theme.font.weight.second}>
            {deck.title}
          </Styles.MessageStyledText>
          {card && (
            <Styles.MessageStyledText
              size={theme.font.size.second}
              weight={theme.font.weight.second}
            >
              {`Card ${index + 1} of ${cards.length} `}
            </Styles.MessageStyledText>
          )}
        </Styles.MessageStyledView>
        {card && <QuizExecutionCard card={card} />}
        {!app.fetched && <Loading color={theme.font.color.first} />}
        {app.fetched && card && (
          <Styles.MainStyledView>
            <Styles.MainContentStyledView>
              <Styles.TitleTextStyledView>
                <Styles.TitleStyledText>Did you get the right one?</Styles.TitleStyledText>
              </Styles.TitleTextStyledView>
              <Styles.ButtonStyledView>
                <Styles.ButtonStyled
                  color={theme.background.color.second}
                  onPress={() => this.onHandleAction(true)}
                >
                  <Styles.ButtonStyledText color={theme.background.color.first}>
                    Yes, I am good :)
                  </Styles.ButtonStyledText>
                </Styles.ButtonStyled>
              </Styles.ButtonStyledView>
              <Styles.ButtonStyledView>
                <Styles.ButtonStyled color="red" onPress={() => this.onHandleAction(false)}>
                  <Styles.ButtonStyledText color={theme.font.color.second}>
                    Not this time :(
                  </Styles.ButtonStyledText>
                </Styles.ButtonStyled>
              </Styles.ButtonStyledView>
            </Styles.MainContentStyledView>
          </Styles.MainStyledView>
        )}
      </Styles.ContentStyledView>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { app } = state;
  const { deck } = ownProps;
  return {
    app,
    cards: QuestionSelectors.getByIds(deck.questions)(state).sort(() => {
      return 0.5 - Math.random();
    }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addQuizz: (title, quiz) => dispatch(QuizCreators.add(title, quiz)),
  };
}

QuizExecution.propTypes = {
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  addQuizz: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(QuizExecution));
