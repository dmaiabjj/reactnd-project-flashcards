import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import decks from '@@stubs/deck';
import questions from '@@stubs/question';
import reducer, { Actions, Types, Creators } from '@store/modules/questions';
import { Actions as DeckActions } from '@store/modules/decks';
import * as ServerAPI from '@api/ServerAPI';

const INITIAL_STATE = Immutable({
  collection: {},
  ids: [],
});

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  INITIAL_STATE,
});

describe('MODULE - QUESTIONS', () => {
  const props = {
    deck: {
      title: {
        react: 'React',
        javascript: 'JavaScript',
      },
    },
    card: {
      id: {
        react: 1,
        ajax: 2,
        closure: 3,
      },
    },
    getDeck: (title, question = []) => {
      return { [title]: { ...decks[title], questions: question } };
    },
    getCard: (id) => {
      return { [id]: questions[id] };
    },
    decks: {
      collection: decks,
      ids: Object.keys(decks),
    },
    cards: {
      collection: questions,
      ids: [1, 2, 3],
    },
    error: new Error('Something went wrong'),
    formatAction: (action) => {
      return `QUESTION/${action}`;
    },
  };

  beforeEach(async () => {
    store.clearActions();
    await ServerAPI.saveDeck(props.deck.title.react);
    await ServerAPI.saveDeck(props.deck.title.javascript);
  });

  /* ACTIONS  */
  it('[ACTIONS] verify all actions creators', () => {
    expect(Actions.question.fetchSuccess(props.getCard(1), [1])).toEqual({
      type: props.formatAction(Types.FETCH_SUCCESS),
      payload: { questions: props.getCard(1), ids: [1] },
    });

    expect(Actions.question.saveRequest()).toEqual({
      type: props.formatAction(Types.SAVE_REQUEST),
    });

    expect(Actions.question.saveSuccess(props.getCard(1), [1])).toEqual({
      type: props.formatAction(Types.SAVE_SUCCESS),
      payload: { questions: props.getCard(1), ids: [1] },
    });

    expect(Actions.question.saveFailure(props.error)).toEqual({
      type: props.formatAction(Types.SAVE_FAILURE),
      payload: props.error,
      error: true,
    });

    expect(Actions.question.deleteRequest()).toEqual({
      type: props.formatAction(Types.DELETE_REQUEST),
    });

    expect(Actions.question.deleteSuccess(2)).toEqual({
      type: props.formatAction(Types.DELETE_SUCCESS),
      payload: { id: 2 },
    });

    expect(Actions.question.deleteFailure(props.error)).toEqual({
      type: props.formatAction(Types.DELETE_FAILURE),
      payload: props.error,
      error: true,
    });
  });
  /* ACTIONS  */

  /* ACTION CREATORS  */

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST->SAVE_SUCCESS action on Deck', async () => {
    const card = props.getCard(props.card.id.closure);
    const deck = props.getDeck(props.deck.title.react, [props.card.id.closure]);
    const expectedActions = [
      Actions.question.saveRequest(),
      DeckActions.deck.saveSuccess(deck, [props.deck.title.react]),
      Actions.question.saveSuccess(card, [props.card.id.closure]),
    ];

    return store
      .dispatch(Creators.add(props.deck.title.react, card[props.card.id.closure]))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST->SAVE_FAILURE action on Deck', async () => {
    ServerAPI.saveCard = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const card = props.getCard(props.card.id.closure);
    const expectedActions = [
      Actions.question.saveRequest(),
      Actions.question.saveFailure(props.error),
    ];

    return store
      .dispatch(Creators.add(props.deck.title.react, card[props.card.id.closure]))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a DELETE_REQUEST->DELETE_SUCCESS ', async () => {
    const expectedActions = [
      Actions.question.deleteRequest(),
      DeckActions.deck.fetchSuccess(props.getDeck(props.deck.title.react, []), [
        props.deck.title.react,
      ]),
      Actions.question.deleteSuccess([props.card.id.closure]),
    ];

    return store
      .dispatch(Creators.delete(props.deck.title.react, props.card.id.closure))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a DELETE_REQUEST->DELETE_FAILURE', async () => {
    ServerAPI.removeCard = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const expectedActions = [
      Actions.question.deleteRequest(),
      Actions.question.saveFailure(props.error),
    ];

    return store
      .dispatch(Creators.delete(props.deck.title.react, props.card.id.closure))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  /* ACTION CREATORS  */

  /* REDUCERS */

  it('[REDUCERS] should handle initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('[REDUCERS] should handle FETCH_SUCCESS action', () => {
    const expected = {
      collection: props.getCard(props.card.id.closure),
      ids: [props.card.id.closure],
    };

    expect(
      reducer(INITIAL_STATE, Actions.question.fetchSuccess(expected.collection, expected.ids)),
    ).toEqual(expected);
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action with INITIAL_STATE EMPTY', () => {
    const expected = {
      collection: props.getCard(props.card.id.closure),
      ids: [props.card.id.closure],
    };

    expect(
      reducer(INITIAL_STATE, Actions.question.saveSuccess(expected.collection, expected.ids)),
    ).toEqual(expected);
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action', () => {
    const state = {
      collection: Immutable.without(props.cards.collection, props.card.id.closure),
      ids: props.cards.ids.filter((id) => props.card.id.closure !== id),
    };
    const entity = props.getCard(props.card.id.closure);
    const expected = {
      collection: props.cards.collection,
      ids: props.cards.ids,
    };
    expect(reducer(state, Actions.question.saveSuccess(entity, [props.card.id.closure]))).toEqual(
      expected,
    );
  });

  it('[REDUCERS] should handle DELETE_SUCCESS action', () => {
    const state = {
      collection: props.cards.collection,
      ids: props.cards.ids,
    };
    const expected = {
      collection: Immutable.without(props.cards.collection, props.card.id.closure),
      ids: props.cards.ids.filter((id) => ![props.card.id.closure].includes(id)),
    };

    expect(reducer(state, Actions.question.deleteSuccess([props.card.id.closure]))).toEqual(
      expected,
    );
  });

  /* REDUCERS */
});
