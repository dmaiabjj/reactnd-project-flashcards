import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { createActions, handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import _ from 'lodash';

import normalize from '@helpers/normalize';
import deckschema from '@store/schemas';
import questionSchema from '@store/schemas/questions';
import quizSchema from '@store/schemas/quizzes';
import { Actions as QuestionActions } from '@store/modules/questions';
import { Actions as QuizActions } from '@store/modules/quizzes';

import { getDecks, getDeck, saveDeck, removeDeck } from '@api/ServerAPI';

const INITIAL_STATE_COLLECTION = Immutable({});

const INITIAL_STATE_IDS = Immutable([]);

/* Action Types */
export const Types = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SAVE_REQUEST: 'SAVE_REQUEST',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
  SAVE_FAILURE: 'SAVE_FAILURE',
  DELETE_REQUEST: 'DELETE_REQUEST',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILURE: 'DELETE_FAILURE',
};

const INITIAL_PAYLOAD = null;
/* Actions  */
export const Actions = createActions({
  DECK: {
    [Types.FETCH_REQUEST]: INITIAL_PAYLOAD,
    [Types.FETCH_SUCCESS]: (decks, ids) => ({ decks, ids }),
    [Types.FETCH_FAILURE]: INITIAL_PAYLOAD,
    [Types.SAVE_REQUEST]: INITIAL_PAYLOAD,
    [Types.SAVE_SUCCESS]: (decks, id) => ({ decks, ids: id }),
    [Types.SAVE_FAILURE]: INITIAL_PAYLOAD,
    [Types.DELETE_REQUEST]: INITIAL_PAYLOAD,
    [Types.DELETE_SUCCESS]: (id) => ({ id }),
    [Types.DELETE_FAILURE]: INITIAL_PAYLOAD,
  },
});

/**
 * @description Dispatch the sequence of actions
 * @param {Function} dispatch - Redux Function
 * @param {Object} data - Deck's data
 * Step 1                - Dispatch DELETE_REQUEST action
 * Step 2    - Success   - Dispatch DELETE_SUCCESS action
 * Step 2.2  - Success   - Dispatch QUESTION DELETE_SUCCESS action
 * Step 2.3  - Success   - Dispatch QUIZZES DELETE_SUCCESS action
 * Step 3    - Failure   - Dispatch DELETE_FAILURE action
 */
const dispatchFetchSucess = (dispatch, data) => {
  let normalized = Object.keys(data).map((key) => data[key]);
  const { decks, quizzes, questions, result: deckIds } = normalize.apply(
    normalized,
    deckschema,
    'entities.decks',
    'entities.quizzes',
    'entities.questions',
    'result',
  );

  normalized = Object.keys(questions).map((key) => questions[key]);

  const { questions: cards, result: cardsIds } = normalize.apply(
    normalized,
    questionSchema,
    'entities.questions',
    'result',
  );

  normalized = Object.keys(quizzes).map((key) => quizzes[key]);

  const { quizzes: rounds, result: roundsIds } = normalize.apply(
    normalized,
    quizSchema,
    'entities.quizzes',
    'result',
  );

  dispatch(QuizActions.quiz.fetchSuccess(rounds, roundsIds));
  dispatch(QuestionActions.question.fetchSuccess(cards, cardsIds));
  dispatch(Actions.deck.fetchSuccess(decks, deckIds));
};

/* Action Creators */
export const Creators = {
  /**
   * @description Fetch all decks
   * Step 1                 - Dispatch FETCH_REQUEST action
   * Step 2     - Success   - Dispatch FETCH_SUCCESS action
   * Step 2.1               - Dispatch QUESTION FETCH_REQUEST action
   * Step 2.3               - Dispatch QUIZZ FETCH_REQUEST action
   * Step 3  - Failure      - Dispatch FETCH_FAILURE action
   */
  fetch: () => {
    return (dispatch) => {
      dispatch(Actions.deck.fetchRequest());
      return getDecks()
        .then((data) => {
          dispatchFetchSucess(dispatch, data);
        })
        .catch((error) => {
          dispatch(Actions.deck.fetchFailure(error));
        });
    };
  },
  /**
   * @description Fetch a specific Deck
   * @param {Object} title  - Deck`s title
   * Step 1                 - Dispatch FETCH_REQUEST action
   * Step 2     - Success   - Dispatch FETCH_SUCCESS action
   * Step 2.1               - Dispatch QUESTION FETCH_REQUEST action
   * Step 2.3               - Dispatch QUIZZ FETCH_REQUEST action
   * Step 3  - Failure      - Dispatch FETCH_FAILURE action
   */
  fetchByTitle: (title) => {
    return (dispatch) => {
      dispatch(Actions.deck.fetchRequest());
      return getDeck(title)
        .then((data) => {
          dispatchFetchSucess(dispatch, data);
        })
        .catch((error) => {
          dispatch(Actions.deck.fetchFailure(error));
        });
    };
  },
  /**
   * @description Add Deck
   * @param {Object} title - Deck`s title
   * @param {Number} timestamp - Date Now
   * Step 1                - Dispatch SAVE_REQUEST action
   * Step 2.1  - Success   - Dispatch SAVE_SUCCESS action
   * Step 2.2  - Failure   - Dispatch SAVE_FAILURE action
   */
  add: (title, timestamp) => {
    return (dispatch) => {
      dispatch(Actions.deck.saveRequest());
      return saveDeck(title, timestamp)
        .then((data) => {
          const normalized = Object.keys(data).map((key) => data[key]);
          const { decks, result } = normalize.apply(
            normalized,
            deckschema,
            'entities.decks',
            'result',
          );
          dispatch(Actions.deck.saveSuccess(decks, result));
        })
        .catch((error) => {
          dispatch(Actions.deck.saveFailure(error));
        });
    };
  },
  /**
   * @description Remove Deck
   * @param {Object} title - Deck`s title
   * Step 1                - Dispatch DELETE_REQUEST action
   * Step 2    - Success   - Dispatch DELETE_SUCCESS action
   * Step 2.2  - Success   - Dispatch QUESTION DELETE_SUCCESS action
   * Step 2.3  - Success   - Dispatch QUIZZES DELETE_SUCCESS action
   * Step 3    - Failure   - Dispatch DELETE_FAILURE action
   */
  delete: (deck) => {
    return (dispatch) => {
      dispatch(Actions.deck.deleteRequest());
      return removeDeck(deck.title)
        .then(() => {
          dispatch(Actions.deck.deleteSuccess(deck.title));
          dispatch(QuestionActions.question.deleteSuccess(deck.questions));
          dispatch(QuizActions.quiz.deleteSuccess(deck.quizzes));
        })
        .catch((error) => {
          dispatch(Actions.deck.deleteFailure(error));
        });
    };
  },
};

/* Reducer  */
const collection = handleActions(
  {
    [combineActions(
      Actions.deck.fetchSuccess,
      Actions.deck.saveSuccess,
      QuestionActions.question.updateDecks,
      QuizActions.quiz.updateDecks,
    )]: (state, { payload }) => {
      return Immutable.merge(state, payload.decks);
    },
    [Actions.deck.deleteSuccess]: (state, { payload }) => {
      return Immutable.without(state, payload.id);
    },
  },
  INITIAL_STATE_COLLECTION,
);

const ids = handleActions(
  {
    [combineActions(Actions.deck.fetchSuccess, Actions.deck.saveSuccess)]: (state, { payload }) => {
      return _.union(state, payload.ids);
    },
    [Actions.deck.deleteSuccess]: (state, { payload }) => {
      return state.filter((id) => id !== payload.id);
    },
  },
  INITIAL_STATE_IDS,
);

/* SELECTORS */

const decksEntitiesSelector = (state) => {
  return {
    decks: state.decks.collection,
    subjects: state.decks.ids,
  };
};

/**
 * @description
 * Returns all decks inside an array
 *
 * @returns {Array} Returns  an array with all
 * decks
 */
const getAll = createSelector(
  [decksEntitiesSelector],
  ({ decks, subjects }) => {
    return subjects && _.orderBy(subjects.map((id) => decks[id]), ['timestamp'], ['desc']);
  },
);

export const Selectors = {
  getAll,
};

/* SELECTORS */

export default combineReducers({ collection, ids });
