import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import _ from 'lodash';
import normalize from '@helpers/normalize';
import schema from '@store/schemas';
import quizSchema from '@store/schemas/quizzes';
import { saveQuiz } from '@api/ServerAPI';
import { Actions as DeckActions } from '@store/modules/decks';

const INITIAL_STATE_COLLECTION = Immutable({});
const INITIAL_STATE_IDS = Immutable([]);

/* Action Types */
export const Types = {
  SAVE_REQUEST: 'SAVE_REQUEST',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
  SAVE_FAILURE: 'SAVE_FAILURE',
};

const INITIAL_PAYLOAD = null;
/* Actions  */
const { saveRequest, saveSuccess, saveFailure } = createActions({
  [Types.SAVE_REQUEST]: INITIAL_PAYLOAD,
  [Types.SAVE_SUCCESS]: INITIAL_PAYLOAD,
  [Types.SAVE_FAILURE]: INITIAL_PAYLOAD,
});

export const Actions = {
  saveRequest,
  saveSuccess,
  saveFailure,
};

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
      dispatch(Actions.saveRequest());
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

          dispatch(DeckActions.saveSuccess({ decks, ids: deckIds }));
          dispatch(Actions.saveSuccess({ quizzes: cards, ids: cardsIds }));
        })
        .catch((error) => {
          dispatch(Actions.saveFailure(error));
        });
    };
  },
};

/* REDUCERS  */
const collection = handleActions(
  {
    [Actions.saveSuccess]: (state, { payload }) => {
      return Immutable.merge(state, payload.quizzes);
    },
  },
  INITIAL_STATE_COLLECTION,
);

const ids = handleActions(
  {
    [Actions.saveSuccess]: (state, { payload }) => {
      return [...state, ...payload.ids];
    },
  },
  INITIAL_STATE_IDS,
);

/* REDUCERS  */

/* SELECTORS */

const quizzesEntitiesSelector = (state) => {
  return {
    quizzes: state.collection,
    subjects: state.ids,
  };
};

/**
 * @description
 * Returns all quizzes inside an array
 *
 * @returns {Function} Returns a function that will receive the state and return an array with all
 * quizzes
 */
export const getAll = () => {
  return createSelector(
    quizzesEntitiesSelector,
    ({ quizzes, subjects }) => {
      return subjects && _.orderBy(subjects.map((id) => quizzes[id]));
    },
  );
};

/* SELECTORS */

export default combineReducers({ collection, ids });
