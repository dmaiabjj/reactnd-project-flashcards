import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import decks from '@@stubs/deck';
import reducer, { Actions, Types, Creators } from '@store/modules/decks';
import * as ServerAPI from '@api/ServerAPI';

const INITIAL_STATE = Immutable({
  collection: {},
  ids: [],
});

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  INITIAL_STATE,
});

describe('MODULE - DECK', () => {
  const props = {
    title: {
      react: 'React',
      javascript: 'JavaScript',
    },
    deck: (title) => {
      return { [title]: decks[title] };
    },
    decks,
    ids: Object.keys(decks),
    error: new Error('Something went wrong'),
  };

  beforeEach(async () => {
    store.clearActions();
    await ServerAPI.saveDeck(props.ids[0]);
    await ServerAPI.saveDeck(props.ids[1]);
  });

  /* ACTIONS  */
  it('[ACTIONS] verify all actions creators', () => {
    expect(Actions.fetchRequest()).toEqual({
      type: Types.FETCH_REQUEST,
    });

    expect(Actions.fetchSuccess(props.deck(props.title.react))).toEqual({
      type: Types.FETCH_SUCCESS,
      payload: props.deck(props.title.react),
    });

    expect(Actions.fetchFailure(props.error)).toEqual({
      type: Types.FETCH_FAILURE,
      payload: props.error,
      error: true,
    });

    expect(Actions.saveRequest()).toEqual({
      type: Types.SAVE_REQUEST,
    });

    expect(Actions.saveSuccess(props.deck(props.title.react))).toEqual({
      type: Types.SAVE_SUCCESS,
      payload: props.deck(props.title.react),
    });

    expect(Actions.saveFailure(props.error)).toEqual({
      type: Types.SAVE_FAILURE,
      payload: props.error,
      error: true,
    });

    expect(Actions.deleteRequest()).toEqual({
      type: Types.DELETE_REQUEST,
    });

    expect(Actions.deleteSuccess(props.title.react)).toEqual({
      type: Types.DELETE_SUCCESS,
      payload: props.title.react,
    });

    expect(Actions.deleteFailure(props.error)).toEqual({
      type: Types.DELETE_FAILURE,
      payload: props.error,
      error: true,
    });
  });
  /* ACTIONS  */

  /* ACTION CREATORS  */

  it('[ACTION CREATORS] should dispatch a FETCH_REQUEST ->  FETCH_SUCCESS action ', async () => {
    const expectedActions = [Actions.fetchRequest(), Actions.fetchSuccess(props.decks)];

    return store
      .dispatch(Creators.fetch())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a FETCH_REQUEST ->  FETCH_FAILURE action ', async () => {
    ServerAPI.getDecks = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const expectedActions = [Actions.fetchRequest(), Actions.fetchFailure(props.error)];

    return store
      .dispatch(Creators.fetch())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a FETCH_REQUEST->FETCH_SUCCESS action Decks', async () => {
    const expectedActions = [
      Actions.fetchRequest(),
      Actions.fetchSuccess(props.deck(props.title.react)),
    ];

    return store
      .dispatch(Creators.fetchByTitle(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a FETCH_REQUEST->FETCH_FAILURE action Decks', async () => {
    ServerAPI.getDeck = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const expectedActions = [Actions.fetchRequest(), Actions.fetchFailure(props.error)];

    return store
      .dispatch(Creators.fetchByTitle(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST->SAVE_SUCCESS action on Deck', async () => {
    const expectedActions = [
      Actions.saveRequest(),
      Actions.saveSuccess(props.deck(props.title.react)),
    ];

    return store
      .dispatch(Creators.add(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST->SAVE_FAILURE action on Deck', async () => {
    ServerAPI.saveDeck = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const expectedActions = [Actions.saveRequest(), Actions.saveFailure(props.error)];

    return store
      .dispatch(Creators.add(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a DELETE_REQUEST ->  DELETE_SUCCESS action ', async () => {
    const expectedActions = [
      Actions.deleteRequest(),
      Actions.deleteSuccess(props.deck(props.title.javascript)),
    ];

    return store
      .dispatch(Creators.delete(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a DELETE_REQUEST ->  DELETE_FAILURE action ', async () => {
    ServerAPI.removeDeck = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const expectedActions = [Actions.deleteRequest(), Actions.deleteFailure(props.error)];

    return store
      .dispatch(Creators.delete(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  /* ACTION CREATORS  */

  /* REDUCERS */
  it('[REDUCERS] should handle initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('[REDUCERS] should handle FETCH_ALL_SUCCESS action for all decks', () => {
    const expected = { collection: props.decks, ids: props.ids };
    expect(reducer(INITIAL_STATE, Actions.fetchSuccess(props.decks))).toEqual(expected);
  });

  it('[REDUCERS] should handle FETCH_SUCCESS action for a specific deck', () => {
    const expected = {
      collection: props.deck(props.title.react),
      ids: props.ids.filter((id) => id === props.title.react),
    };
    expect(reducer(INITIAL_STATE, Actions.fetchSuccess(props.deck(props.title.react)))).toEqual(
      expected,
    );
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action with INITIAL_STATE EMPTY', () => {
    const expected = {
      collection: props.deck(props.title.react),
      ids: props.ids.filter((id) => id === props.title.react),
    };
    expect(reducer(INITIAL_STATE, Actions.saveSuccess(props.deck(props.title.react)))).toEqual(
      expected,
    );
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action', () => {
    const state = {
      collection: props.decks,
      ids: props.ids,
    };
    const entity = { Redux: { title: 'Redux', questions: [] } };
    const expected = {
      collection: { ...props.decks, ...entity },
      ids: props.ids.concat(Object.keys(entity)),
    };
    expect(reducer(state, Actions.saveSuccess(entity))).toEqual(expected);
  });

  it('[REDUCERS] should handle DELETE_SUCCESS action', () => {
    const expected = {
      collection: props.decks,
      ids: props.ids,
    };
    const entity = { Redux: { title: 'Redux', questions: [] } };
    const state = {
      collection: { ...props.decks, ...entity },
      ids: props.ids.concat(Object.keys(entity)),
    };
    expect(reducer(state, Actions.deleteSuccess(Object.keys(entity)[0]))).toEqual(expected);
  });

  /* REDUCERS */
});
