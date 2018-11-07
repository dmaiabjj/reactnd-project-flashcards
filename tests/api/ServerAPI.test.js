import _ from 'lodash';
import cards from '../stubs/card';
import decks from '../stubs/deck';
import {
  getDecks,
  getDeck,
  saveDeck,
  saveCard,
  removeDeck,
  removeCard,
} from '../../src/api/ServerAPI';

describe('API', () => {
  const props = {
    title: {
      react: 'React',
      javascript: 'JavaScript',
      redux: 'Redux',
    },
    deck: (title) => {
      return { [title]: decks[title] };
    },
    decks,
    card: {
      react: cards[0],
      ajax: cards[1],
      closure: cards[2],
    },
    cards,
  };

  it('[Method - getDecks] should handle initial state', async () => {
    const expected = await getDecks();
    expect(expected).toEqual({});
  });

  it('[Method - getDecks] should return a specific Deck', async () => {
    await saveDeck(props.title.react);
    await saveDeck(props.title.javascript);

    const expected = await getDeck(props.title.javascript);

    expect(expected).toEqual(props.deck(props.title.javascript));
  });

  it('[Method - getDecks] should handle an unknown deck', async () => {
    await saveDeck(props.title.react);
    await saveDeck(props.title.javascript);

    const expected = await getDeck(props.title.redux);
    expect(expected).toEqual({});
  });

  it('[Method - saveDeck] should insert a new deck', async () => {
    const expected = await saveDeck(props.title.react);
    expect(expected).toEqual(props.deck(props.title.react));
  });

  it('[Method - getDeck] should handle insert decks', async () => {
    await saveDeck(props.title.react);
    await saveDeck(props.title.javascript);
    const expected = await getDecks();
    expect(expected).toEqual(props.decks);
  });

  it('[Method - addCard] should handle insert cards on deck', async () => {
    await saveDeck(props.title.react);
    await saveCard(props.title.react, props.card.react);
    await saveCard(props.title.react, props.card.ajax);
    await saveCard(props.title.react, props.card.closure);

    const expected = await getDeck(props.title.react);

    expect(expected[props.title.react].questions).toEqual(props.cards);
  });

  it('[Method - removeDeck] should handle remove deck', async () => {
    await saveDeck(props.title.react);
    await saveDeck(props.title.javascript);

    const expected = await removeDeck(props.title.react);

    expect(expected).toEqual(_.omit(decks, props.title.react));
  });

  it('[Method - removeCard] should handle remove card', async () => {
    await saveDeck(props.title.react);
    await saveDeck(props.title.javascript);
    await saveCard(props.title.react, props.card.react);
    await saveCard(props.title.javascript, props.card.ajax);
    await saveCard(props.title.react, props.card.closure);

    const expected = await removeCard(props.title.react, props.card.react.id);
    expect(expected[props.title.react].questions).toEqual([props.card.closure]);
  });
});
