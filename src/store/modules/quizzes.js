import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { createActions, handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import _ from 'lodash';
import normalize from '@helpers/normalize';
import schema from '@store/schemas';
import quizSchema from '@store/schemas/quizzes';
import { saveQuiz } from '@api/ServerAPI';

const INITIAL_STATE_COLLECTION = Immutable({});
const INITIAL_STATE_IDS = Immutable([]);

/* Action Types */
export const Types = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  SAVE_REQUEST: 'SAVE_REQUEST',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
  SAVE_FAILURE: 'SAVE_FAILURE',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  UPDATE_DECKS: 'UPDATE_DECKS',
};

const INITIAL_PAYLOAD = null;
/* Actions  */
export const Actions = createActions({
  QUIZ: {
    [Types.FETCH_SUCCESS]: (quizzes, ids) => ({ quizzes, ids }),
    [Types.SAVE_REQUEST]: INITIAL_PAYLOAD,
    [Types.SAVE_SUCCESS]: (quizzes, id) => ({ quizzes, ids: id }),
    [Types.SAVE_FAILURE]: INITIAL_PAYLOAD,
    [Types.DELETE_SUCCESS]: (id) => ({ id }),
    [Types.UPDATE_DECKS]: (decks, ids) => ({ decks, ids }),
  },
});

/* Action Creators */
export const Creators = {
  /**
   * @description Add Deck
   * @param {Object} title - Deck`s title
   * @param {Object} quiz - Quiz
   * Step 1                - Dispatch SAVE_REQUEST action
   * Step 2.1  - Success   - Dispatch SAVE_SUCCESS action
   * Step 2.2  - Failure   - Dispatch SAVE_FAILURE action
   */
  add: (title, quiz) => {
    return (dispatch) => {
      dispatch(Actions.quiz.saveRequest());
      return saveQuiz(title, quiz)
        .then((data) => {
          let normalized = Object.keys(data).map((key) => data[key]);
          const { decks, quizzes, result: deckIds } = normalize.apply(
            normalized,
            schema,
            'entities.decks',
            'entities.quizzes',
            'result',
          );

          normalized = Object.keys(quizzes).map((key) => quizzes[key]);

          const { quizzes: cards, result: cardsIds } = normalize.apply(
            normalized,
            quizSchema,
            'entities.quizzes',
            'result',
          );

          dispatch(Actions.quiz.saveSuccess(cards, cardsIds));
          dispatch(Actions.quiz.updateDecks(decks, deckIds));
        })
        .catch((error) => {
          dispatch(Actions.quiz.saveFailure(error));
        });
    };
  },
};

/* REDUCERS  */
const collection = handleActions(
  {
    [combineActions(Actions.quiz.fetchSuccess, Actions.quiz.saveSuccess)]: (state, { payload }) => {
      return Immutable.merge(state, payload.quizzes);
    },
    [Actions.quiz.deleteSuccess]: (state, { payload }) => {
      return Immutable.without(state, payload.id);
    },
  },
  INITIAL_STATE_COLLECTION,
);

const ids = handleActions(
  {
    [combineActions(Actions.quiz.fetchSuccess, Actions.quiz.saveSuccess)]: (state, { payload }) => {
      return _.union(state, payload.ids);
    },
    [Actions.quiz.deleteSuccess]: (state, { payload }) => {
      return state.filter((id) => !payload.id.includes(id));
    },
  },
  INITIAL_STATE_IDS,
);

/* REDUCERS  */

/* SELECTORS */

const quizzesEntitiesSelector = (state) => {
  return {
    quizzes: state.quizzes.collection,
    subjects: state.quizzes.ids,
  };
};

/**
 * @description
 * Returns all quizzes inside an array
 *
 * @returns {Array} Returns an array with all
 * quizzes
 */
const getAll = createSelector(
  [quizzesEntitiesSelector],
  ({ quizzes, subjects }) => {
    return subjects && subjects.map((id) => quizzes[id]);
  },
);

/**
 * @description
 * Returns all quizzes related with specific ids provided
 *
 * @returns {Array} Returns an array with all
 * quizzes
 */
const getByIds = (quizzesIds) => {
  return createSelector(
    quizzesEntitiesSelector,
    ({ quizzes }) => {
      return quizzesIds && _.orderBy(quizzesIds.map((id) => quizzes[id]), ['points'], ['desc']);
    },
  );
};

export const Selectors = {
  getAll,
  getByIds,
};

/* SELECTORS */

export default combineReducers({ collection, ids });
