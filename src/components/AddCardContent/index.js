import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Styles from '@components/AddCardContent/styles';
import Loading from '@components/Loading';
import MainBackground from '@components/MainBackground';
import CarouselCard from '@components/CarouselCard';
import QuestionCard from '@components/QuestionCard';

import { Creators as DeckCreators, Selectors as DeckSelectors } from '@store/modules/decks';
import {
  Creators as QuestionCreators,
  Selectors as QuestionSelectors,
} from '@store/modules/questions';

const imageSrc = require('../../../assets/images/background.png');

class AddCardContent extends PureComponent {
  INITIAL_STATE = {
    question: '',
    answer: '',
    submited: false,
    error: true,
  };

  state = this.INITIAL_STATE;

  componentDidMount() {
    const { getDeckByTitle, deck } = this.props;
    getDeckByTitle(deck.title);
  }

  renderItem = ({ item, index }) => {
    const {
      theme,
      deck: { title },
      deleteCard,
    } = this.props;
    return (
      <QuestionCard
        key={index}
        deck={title}
        question={item}
        theme={theme}
        onDeleteHandler={deleteCard}
      />
    );
  };

  selectedItem = () => {};

  handleQuestionChange = (question) => {
    const { answer } = this.state;
    const error = question.length < 3 || answer.length < 3;
    const submited = question.length > 0 && answer.length > 0;
    this.setState({ question, error, submited });
  };

  handleAnswerChange = (answer) => {
    const { question } = this.state;
    const error = question.length < 3 || answer.length < 3;
    const submited = question.length > 0 && answer.length > 0;
    this.setState({ answer, error, submited });
  };

  onPress = () => {
    const {
      addCard,
      deck: { title },
    } = this.props;
    const { question, answer } = this.state;
    const card = { id: uuid(), question, answer, timestamp: Date.now() };
    addCard(title, card);
    this.setState(this.INITIAL_STATE);
  };

  render() {
    const { theme, app, deck = {}, cards } = this.props;
    const { question, answer, error, submited } = this.state;
    return (
      <Styles.ContentStyledView>
        <MainBackground imageSrc={imageSrc} />
        <Styles.MessageStyledView>
          <Styles.MessageStyledText size={theme.font.size.third} weight={theme.font.weight.second}>
            {deck.title}
          </Styles.MessageStyledText>
          <Styles.MessageStyledText size={theme.font.size.first} weight={theme.font.weight.second}>
            {cards.length} Card(s)
          </Styles.MessageStyledText>
        </Styles.MessageStyledView>
        {!app.fetched && <Loading color={theme.font.color.first} />}
        {app.fetched && deck && cards && (
          <Styles.MainStyledView>
            <CarouselCard
              data={cards}
              renderItem={this.renderItem}
              selectedItem={this.selectedItem}
              itemWidth={300}
              itemHeight={150}
            />

            <Styles.MainContentStyledView>
              <Styles.TitleTextStyledView>
                <Styles.TitleStyledText>What is your question?</Styles.TitleStyledText>
              </Styles.TitleTextStyledView>
              <Styles.CardSubjectStyledView>
                <Styles.CardSubjectStyledText
                  placeholderTextColor={theme.input.color.first}
                  placeholder="What is the question?"
                  name="question"
                  onChangeText={this.handleQuestionChange}
                  value={question}
                  multiline
                  size={50}
                />
                {error && submited && (
                  <Styles.CardSubjectErrorStyledText>
                    Invalid Question: 3 digits at least
                  </Styles.CardSubjectErrorStyledText>
                )}
              </Styles.CardSubjectStyledView>
              <Styles.CardSubjectStyledView>
                <Styles.CardSubjectStyledText
                  placeholderTextColor={theme.input.color.first}
                  placeholder="What is the answer?"
                  name="answer"
                  onChangeText={this.handleAnswerChange}
                  value={answer}
                  multiline
                  size={100}
                />
                {error && submited && (
                  <Styles.CardSubjectErrorStyledText>
                    Invalid Answer: 3 digits at least
                  </Styles.CardSubjectErrorStyledText>
                )}
              </Styles.CardSubjectStyledView>
              <Styles.AddButtonStyledView>
                <Styles.AddButtonStyled onPress={() => !error && this.onPress()}>
                  <Styles.AddButtonStyledText>Add</Styles.AddButtonStyledText>
                </Styles.AddButtonStyled>
              </Styles.AddButtonStyledView>
            </Styles.MainContentStyledView>
          </Styles.MainStyledView>
        )}
      </Styles.ContentStyledView>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {
    deck: { title },
  } = ownProps;
  const { app } = state;
  const deck = DeckSelectors.getBytTitle(title)(state);
  return {
    app,
    cards: QuestionSelectors.getByIds(deck.questions)(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDeckByTitle: (title) => dispatch(DeckCreators.fetchByTitle(title)),
    addCard: (title, card) => dispatch(QuestionCreators.add(title, card)),
    deleteCard: (deck, card) => dispatch(QuestionCreators.delete(deck, card.id)),
  };
}

AddCardContent.propTypes = {
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  getDeckByTitle: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(AddCardContent));
