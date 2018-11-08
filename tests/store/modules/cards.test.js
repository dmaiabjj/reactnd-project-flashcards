import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import decks from '@@stubs/deck';
import cards from '@@stubs/card';
import reducer, { Actions, Types, Creators } from '@store/modules/cards';
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

describe('MODULE - CARDS', () => {
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
    getDeck: (title, questions) => {
      return { [title]: { ...decks[title], questions } };
    },
    getCard: (id) => {
      return { [id]: cards[id] };
    },
    decks: {
      collection: decks,
      ids: Object.keys(decks),
    },
    cards: {
      collection: cards,
      ids: [1, 2, 3],
    },
    error: new Error('Something went wrong'),
  };

  beforeEach(async () => {
    store.clearActions();
    await ServerAPI.saveDeck(props.deck.title.react);
    await ServerAPI.saveDeck(props.deck.title.javascript);
  });

  /* ACTIONS  */
  it('[ACTIONS] verify all actions creators', () => {
    expect(Actions.saveRequest()).toEqual({
      type: Types.SAVE_REQUEST,
    });

    expect(Actions.saveSuccess(props.getCard(1))).toEqual({
      type: Types.SAVE_SUCCESS,
      payload: props.getCard(1),
    });

    expect(Actions.saveFailure(props.error)).toEqual({
      type: Types.SAVE_FAILURE,
      payload: props.error,
      error: true,
    });

    expect(Actions.deleteRequest()).toEqual({
      type: Types.DELETE_REQUEST,
    });

    expect(Actions.deleteSuccess(props.getCard(2))).toEqual({
      type: Types.DELETE_SUCCESS,
      payload: props.getCard(2),
    });

    expect(Actions.deleteFailure(props.error)).toEqual({
      type: Types.DELETE_FAILURE,
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
      Actions.saveRequest(),
      DeckActions.saveSuccess({
        decks: deck,
        ids: [props.deck.title.react],
      }),
      Actions.saveSuccess({
        cards: card,
        ids: [props.card.id.closure],
      }),
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
    const expectedActions = [Actions.saveRequest(), Actions.saveFailure(props.error)];

    return store
      .dispatch(Creators.add(props.deck.title.react, card[props.card.id.closure]))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a DELETE_REQUEST->DELETE_SUCCESS ', async () => {
    const expectedActions = [
      Actions.deleteRequest(),
      DeckActions.fetchSuccess({
        decks: props.getDeck(props.deck.title.react, []),
        ids: [props.deck.title.react],
      }),
      Actions.deleteSuccess({
        id: props.card.id.closure,
      }),
    ];

    return store
      .dispatch(Creators.delete(props.deck.title.react, props.card.id.closure))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a DELETE_REQUEST->DELETE_FAILURE', async () => {
    ServerAPI.removeCard = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const expectedActions = [Actions.deleteRequest(), Actions.saveFailure(props.error)];

    return store
      .dispatch(Creators.delete(props.deck.title.react, props.card.id.closure))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  /* ACTION CREATORS  */

  /* REDUCERS */

  it('[REDUCERS] should handle initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action with INITIAL_STATE EMPTY', () => {
    const expected = {
      collection: props.getCard(props.card.id.closure),
      ids: [props.card.id.closure],
    };
    const request = { cards: expected.collection, ids: expected.ids };
    expect(reducer(INITIAL_STATE, Actions.saveSuccess(request))).toEqual(expected);
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
    const request = { cards: entity, ids: [props.card.id.closure] };
    expect(reducer(state, Actions.saveSuccess(request))).toEqual(expected);
  });

  it('[REDUCERS] should handle DELETE_SUCCESS action', () => {
    const state = {
      collection: props.cards.collection,
      ids: props.cards.ids,
    };
    const expected = {
      collection: Immutable.without(props.cards.collection, props.card.id.closure),
      ids: props.cards.ids.filter((id) => props.card.id.closure !== id),
    };
    const request = { id: props.card.id.closure };
    expect(reducer(state, Actions.deleteSuccess(request))).toEqual(expected);
  });

  /* REDUCERS */
});
