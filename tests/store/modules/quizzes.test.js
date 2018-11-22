import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

import quizzes from '@@stubs/quiz';
import decks from '@@stubs/deck';
import reducer, { Actions, Types, Creators, Selectors } from '@store/modules/quizzes';
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

describe('MODULE - QUIZZES', () => {
  const props = {
    deck: {
      title: {
        react: 'React',
        javascript: 'JavaScript',
        graphQL: 'GraphQL',
      },
    },
    quiz: {
      id: {
        first: 1,
        second: 2,
        third: 3,
      },
    },
    getQuiz: (id) => {
      return { [id]: quizzes[id] };
    },
    getDeck: (title, question = [], quiz = []) => {
      return { [title]: { ...decks[title], questions: question, quizzes: quiz } };
    },
    quizzes: {
      collection: quizzes,
      ids: [2, 3, 1],
    },
    error: new Error('Something went wrong'),
    formatAction: (action) => {
      return `QUIZ/${action}`;
    },
  };

  beforeEach(async () => {
    store.clearActions();
    await ServerAPI.saveDeck(props.deck.title.react);
    await ServerAPI.saveDeck(props.deck.title.javascript);
  });

  /* ACTIONS  */
  it('[ACTIONS] verify all actions creators', () => {
    expect(
      Actions.quiz.fetchSuccess(props.getQuiz(props.quiz.id.first), [props.quiz.id.first]),
    ).toEqual({
      type: props.formatAction(Types.FETCH_SUCCESS),
      payload: { quizzes: props.getQuiz(props.quiz.id.first), ids: [props.quiz.id.first] },
    });

    expect(Actions.quiz.saveRequest()).toEqual({
      type: props.formatAction(Types.SAVE_REQUEST),
    });

    expect(
      Actions.quiz.saveSuccess(props.getQuiz(props.quiz.id.first), [props.quiz.id.first]),
    ).toEqual({
      type: props.formatAction(Types.SAVE_SUCCESS),
      payload: { quizzes: props.getQuiz(props.quiz.id.first), ids: [props.quiz.id.first] },
    });

    expect(Actions.quiz.saveFailure(props.error)).toEqual({
      type: props.formatAction(Types.SAVE_FAILURE),
      payload: props.error,
      error: true,
    });

    expect(Actions.quiz.deleteSuccess([props.quiz.id.first])).toEqual({
      type: props.formatAction(Types.DELETE_SUCCESS),
      payload: { id: [props.quiz.id.first] },
    });
  });
  /* ACTIONS  */

  /* ACTION CREATORS  */

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST->SAVE_SUCCESS action on Quiz', async () => {
    const quiz = props.getQuiz(props.quiz.id.first);
    const deck = props.getDeck(props.deck.title.react, [], [props.quiz.id.first]);
    const expectedActions = [
      Actions.quiz.saveRequest(),
      DeckActions.deck.saveSuccess(deck, [props.deck.title.react]),
      Actions.quiz.saveSuccess(quiz, [props.quiz.id.first]),
    ];

    return store
      .dispatch(Creators.add(props.deck.title.react, quiz[props.quiz.id.first]))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST->SAVE_FAILURE action on Quiz', async () => {
    ServerAPI.saveQuiz = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error('Something went wrong'));
    });

    const quiz = props.getQuiz(props.quiz.id.first);
    const expectedActions = [Actions.quiz.saveRequest(), Actions.quiz.saveFailure(props.error)];

    return store
      .dispatch(Creators.add(props.deck.title.react, quiz[props.quiz.id.first]))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  /* ACTION CREATORS  */

  /* REDUCERS */

  it('[REDUCERS] should handle initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('[REDUCERS] should handle FETCH_SUCCESS action', () => {
    const expected = {
      collection: props.getQuiz(props.quiz.id.first),
      ids: [props.quiz.id.first],
    };

    expect(
      reducer(INITIAL_STATE, Actions.quiz.fetchSuccess(expected.collection, expected.ids)),
    ).toEqual(expected);
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action with INITIAL_STATE EMPTY', () => {
    const expected = {
      collection: props.getQuiz(props.quiz.id.first),
      ids: [props.quiz.id.first],
    };
    expect(
      reducer(INITIAL_STATE, Actions.quiz.saveSuccess(expected.collection, expected.ids)),
    ).toEqual(expected);
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action', () => {
    const state = {
      collection: Immutable.without(props.quizzes.collection, props.quiz.id.first),
      ids: props.quizzes.ids.filter((id) => props.quiz.id.first !== id),
    };
    const entity = props.getQuiz(props.quiz.id.first);
    const expected = {
      collection: props.quizzes.collection,
      ids: props.quizzes.ids,
    };
    expect(reducer(state, Actions.quiz.saveSuccess(entity, [props.quiz.id.first]))).toEqual(
      expected,
    );
  });

  it('[REDUCERS] should handle DELETE_SUCCESS action', () => {
    const state = {
      collection: props.quizzes.collection,
      ids: props.quizzes.ids,
    };
    const expected = {
      collection: Immutable.without(props.quizzes.collection, [props.quiz.id.first]),
      ids: props.quizzes.ids.filter((id) => ![props.quiz.id.first].includes(id)),
    };
    expect(reducer(state, Actions.quiz.deleteSuccess([props.quiz.id.first]))).toEqual(expected);
  });

  /* REDUCERS */

  /* SELECTORS */

  it('[SELECTORS] should handle getAll quizzes', () => {
    const state = {
      quizzes: {
        collection: props.quizzes.collection,
        ids: props.quizzes.ids,
      },
    };

    const expected = _.orderBy(state.quizzes.ids.map((id) => state.quizzes.collection[id]));

    expect(Selectors.getAll(state)).toEqual(expected);
  });

  it('[SELECTORS] should handle getById quizzes', () => {
    const state = {
      quizzes: {
        collection: props.quizzes.collection,
        ids: props.quizzes.ids,
      },
    };

    const expected = [3, 1, 2].map((id) => state.quizzes.collection[id]);
    expect(Selectors.getByIds([1, 2, 3])(state)).toEqual(expected);
  });

  /* SELECTORS */
});
