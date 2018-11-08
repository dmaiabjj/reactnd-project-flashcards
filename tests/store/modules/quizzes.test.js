import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import quizzes from '@@stubs/quiz';
import decks from '@@stubs/deck';
import reducer, { Actions, Types, Creators } from '@store/modules/quizzes';
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

    expect(Actions.saveSuccess(props.getQuiz(props.quiz.id.first))).toEqual({
      type: Types.SAVE_SUCCESS,
      payload: props.getQuiz(props.quiz.id.first),
    });

    expect(Actions.saveFailure(props.error)).toEqual({
      type: Types.SAVE_FAILURE,
      payload: props.error,
      error: true,
    });
  });
  /* ACTIONS  */

  /* ACTION CREATORS  */

  it('[ACTION CREATORS] should dispatch a SAVE_REQUEST->SAVE_SUCCESS action on Quiz', async () => {
    const quiz = props.getQuiz(props.quiz.id.first);
    const deck = props.getDeck(props.deck.title.react, [], [props.quiz.id.first]);
    const expectedActions = [
      Actions.saveRequest(),
      DeckActions.saveSuccess({
        decks: deck,
        ids: [props.deck.title.react],
      }),
      Actions.saveSuccess({
        quizzes: quiz,
        ids: [props.quiz.id.first],
      }),
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
    const expectedActions = [Actions.saveRequest(), Actions.saveFailure(props.error)];

    return store
      .dispatch(Creators.add(props.deck.title.react, quiz[props.quiz.id.first]))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  /* ACTION CREATORS  */

  /* REDUCERS */

  it('[REDUCERS] should handle initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('[REDUCERS] should handle SAVE_SUCCESS action with INITIAL_STATE EMPTY', () => {
    const expected = {
      collection: props.getQuiz(props.quiz.id.first),
      ids: [props.quiz.id.first],
    };
    const request = { quizzes: expected.collection, ids: expected.ids };
    expect(reducer(INITIAL_STATE, Actions.saveSuccess(request))).toEqual(expected);
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
    const request = { quizzes: entity, ids: [props.quiz.id.first] };
    expect(reducer(state, Actions.saveSuccess(request))).toEqual(expected);
  });

  /* REDUCERS */
});
