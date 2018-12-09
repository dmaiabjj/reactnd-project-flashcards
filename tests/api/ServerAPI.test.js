import _ from 'lodash';
import questions from '@@stubs/question';
import decks from '@@stubs/deck';
import quizzes from '@@stubs/quiz';
import {
  getDecks,
  getDeck,
  saveDeck,
  saveCard,
  removeDeck,
  removeCard,
  saveQuiz,
} from '../../src/api/ServerAPI';

describe('API', () => {
  const props = {
    title: {
      react: 'React',
      javascript: 'JavaScript',
      graphQL: 'GraphQL',
    },
    deck: (title) => {
      return { [title]: decks[title] };
    },
    quiz: (id) => {
      return quizzes[id];
    },
    decks,
    card: {
      react: questions[1],
      ajax: questions[2],
      closure: questions[3],
    },
    quizzes,
    cards: questions,
    timestamp: 1543520781,
  };

  it('[Method - getDecks] should handle initial state', async () => {
    const expected = await getDecks();
    expect(expected).toEqual({});
  });

  it('[Method - getDecks] should return a specific Deck', async () => {
    await saveDeck(props.title.react, props.timestamp);
    await saveDeck(props.title.javascript, props.timestamp);

    const expected = await getDeck(props.title.javascript);

    expect(expected).toEqual(props.deck(props.title.javascript));
  });

  it('[Method - getDecks] should handle an unknown deck', async () => {
    await saveDeck(props.title.react, props.timestamp);
    await saveDeck(props.title.javascript, props.timestamp);

    const expected = await getDeck(props.title.redux);
    expect(expected).toEqual({});
  });

  it('[Method - saveDeck] should insert a new deck', async () => {
    const expected = await saveDeck(props.title.react, props.timestamp);
    expect(expected).toEqual(props.deck(props.title.react));
  });

  it('[Method - getDeck] should handle insert decks', async () => {
    await saveDeck(props.title.react, props.timestamp);
    await saveDeck(props.title.javascript, props.timestamp);
    await saveDeck(props.title.graphQL, props.timestamp);

    const expected = await getDecks();
    expect(expected).toEqual(props.decks);
  });

  it('[Method - addCard] should handle insert cards on deck', async () => {
    await saveDeck(props.title.react, props.timestamp);
    await saveCard(props.title.react, props.card.react);
    await saveCard(props.title.react, props.card.ajax);
    await saveCard(props.title.react, props.card.closure);

    const expected = await getDeck(props.title.react);

    expect(expected[props.title.react].questions).toEqual(
      Object.keys(props.cards).map((key) => props.cards[key]),
    );
  });

  it('[Method - removeDeck] should handle remove deck', async () => {
    await saveDeck(props.title.react, props.timestamp);
    await saveDeck(props.title.javascript, props.timestamp);
    await saveDeck(props.title.graphQL, props.timestamp);

    await removeDeck(props.title.react);

    const expected = await getDecks();

    expect(expected).toEqual(_.omit(decks, props.title.react));
  });

  it('[Method - removeCard] should handle remove card', async () => {
    await saveDeck(props.title.react, props.timestamp);
    await saveDeck(props.title.javascript, props.timestamp);
    await saveCard(props.title.react, props.card.react);
    await saveCard(props.title.javascript, props.card.ajax);
    await saveCard(props.title.react, props.card.closure);

    await removeCard(props.title.react, props.card.react.id);

    const expected = await getDecks();

    expect(expected[props.title.react].questions).toEqual([props.card.closure]);
  });

  it('[Method - saveQuiz] should handle add a quiz', async () => {
    const deck = props.deck(props.title.react);
    const quiz = props.quiz(1);
    await saveDeck(props.title.react, props.timestamp);
    await saveQuiz(props.title.react, quiz);

    const expected = await getDeck(props.title.react);
    const result = {
      ...deck,
      [props.title.react]: { ...deck[props.title.react], quizzes: [quiz] },
    };
    expect(expected).toEqual(result);
  });
});
