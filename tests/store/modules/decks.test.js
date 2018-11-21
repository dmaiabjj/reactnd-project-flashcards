import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

import decks from '@@stubs/deck';
import questions from '@@stubs/question';
import quizzes from '@@stubs/quiz';

import reducer, { Actions, Types, Creators, Selectors } from '@store/modules/decks';
import { Actions as QuestionActions } from '@store/modules/questions';
import { Actions as QuizzActions } from '@store/modules/quizzes';

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
      graphQl: 'GraphQL',
    },
    getDeck: (title, quizzCollection = [], questionCollection = []) => {
      return { [title]: { title, quizzes: quizzCollection, questions: questionCollection } };
    },
    getQuestion: (id) => {
      return { [id]: questions[id] };
    },
    getQuizz: (id) => {
      return { [id]: quizzes[id] };
    },
    decks,
    ids: Object.keys(decks),
    error: new Error('Something went wrong'),
  };

  beforeEach(async () => {
    store.clearActions();
    await ServerAPI.saveDeck(props.title.react);
    await ServerAPI.saveDeck(props.title.javascript);
    await ServerAPI.saveDeck(props.title.graphQl);
  });

  afterAll(async () => {});

  /* ACTIONS  */
  it('[ACTIONS] verify all actions creators', () => {
    expect(Actions.fetchRequest()).toEqual({
      type: Types.FETCH_REQUEST,
    });

    expect(Actions.fetchSuccess(props.getDeck(props.title.react), [props.title.react])).toEqual({
      type: Types.FETCH_SUCCESS,
      payload: { decks: props.getDeck(props.title.react), ids: [props.title.react] },
    });

    expect(Actions.fetchFailure(props.error)).toEqual({
      type: Types.FETCH_FAILURE,
      payload: props.error,
      error: true,
    });

    expect(Actions.saveRequest()).toEqual({
      type: Types.SAVE_REQUEST,
    });

    expect(Actions.saveSuccess(props.getDeck(props.title.react), [props.title.react])).toEqual({
      type: Types.SAVE_SUCCESS,
      payload: { decks: props.getDeck(props.title.react), ids: [props.title.react] },
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
      payload: { id: props.title.react },
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
    const expectedActions = [
      Actions.fetchRequest(),
      Actions.fetchSuccess(props.decks, props.ids),
      QuestionActions.fetchSuccess({}, []),
      QuizzActions.fetchSuccess({}, []),
    ];

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

  it('[ACTION CREATORS] should dispatch a FETCH_REQUEST -> FETCH_SUCCESS BY TITLE', async () => {
    await ServerAPI.saveCard(props.title.react, props.getQuestion(1)[1]);
    await ServerAPI.saveQuiz(props.title.react, props.getQuizz(1)[1]);

    const expected = {
      ...props.getDeck(props.title.react, [1], [1]),
    };

    const expectedActions = [
      Actions.fetchRequest(),
      Actions.fetchSuccess(expected, [props.title.react]),
      QuestionActions.fetchSuccess(props.getQuestion(1), [1]),
      QuizzActions.fetchSuccess(props.getQuizz(1), [1]),
    ];

    return store
      .dispatch(Creators.fetchByTitle(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a FETCH_REQUEST -> FETCH_FAILURE BY TITLE', async () => {
    ServerAPI.getDeck = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const expectedActions = [Actions.fetchRequest(), Actions.fetchFailure(props.error)];

    return store
      .dispatch(Creators.fetchByTitle(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST->SAVE_SUCCESS', async () => {
    const expectedActions = [
      Actions.saveRequest(),
      Actions.saveSuccess(props.getDeck(props.title.react), [props.title.react]),
    ];

    return store
      .dispatch(Creators.add(props.title.react))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST -> SAVE_FAILURE', async () => {
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
      Actions.deleteSuccess(props.title.react),
      QuestionActions.deleteSuccess([]),
      QuizzActions.deleteSuccess([]),
    ];

    return store
      .dispatch(Creators.delete(props.decks[props.title.react]))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a DELETE_REQUEST ->  DELETE_FAILURE action ', async () => {
    ServerAPI.removeDeck = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const expectedActions = [Actions.deleteRequest(), Actions.deleteFailure(props.error)];

    return store
      .dispatch(Creators.delete(props.decks[props.title.react]))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  /* ACTION CREATORS  */

  /* REDUCERS */
  it('[REDUCERS] should handle initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('[REDUCERS] should handle FETCH_ALL_SUCCESS action for all decks', () => {
    const expected = { collection: props.decks, ids: props.ids };
    expect(reducer(INITIAL_STATE, Actions.fetchSuccess(expected.collection, expected.ids))).toEqual(
      expected,
    );
  });

  it('[REDUCERS] should handle FETCH_SUCCESS action for a specific deck', () => {
    const expected = {
      collection: props.getDeck(props.title.react),
      ids: props.ids.filter((id) => id === props.title.react),
    };
    expect(reducer(INITIAL_STATE, Actions.fetchSuccess(expected.collection, expected.ids))).toEqual(
      expected,
    );
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action with INITIAL_STATE EMPTY', () => {
    const expected = {
      collection: props.getDeck(props.title.react),
      ids: props.ids.filter((id) => id === props.title.react),
    };
    expect(reducer(INITIAL_STATE, Actions.saveSuccess(expected.collection, expected.ids))).toEqual(
      expected,
    );
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action', () => {
    const state = {
      collection: props.decks,
      ids: props.ids,
    };
    const entity = {
      [props.title.react]: { title: props.title.react, questions: [], quizzes: [] },
    };
    const expected = {
      collection: { ...props.decks, ...entity },
      ids: props.ids.concat(Object.keys(entity)),
    };
    expect(reducer(state, Actions.saveSuccess(entity, [props.title.react]))).toEqual(expected);
  });

  it('[REDUCERS] should handle DELETE_SUCCESS action', () => {
    const state = {
      collection: props.decks,
      ids: props.ids,
    };

    const expected = {
      collection: Immutable.without(state.collection, props.title.javascript),
      ids: state.ids.filter((id) => id !== props.title.javascript),
    };

    expect(reducer(state, Actions.deleteSuccess(props.title.javascript))).toEqual(expected);
  });

  /* REDUCERS */

  /* SELECTORS */

  it('[SELECTORS] should handle getAll decks', () => {
    const state = {
      decks: {
        collection: props.decks,
        ids: props.ids,
      },
    };

    const expected = _.orderBy(state.decks.ids.map((id) => state.decks.collection[id]));

    expect(Selectors.getAll(state)).toEqual(expected);
  });

  /* SELECTORS */
});
