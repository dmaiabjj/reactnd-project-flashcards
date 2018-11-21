import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { createActions, handleActions, combineActions } from 'redux-actions';

import normalize from '@helpers/normalize';
import schema from '@store/schemas';
import questionSchema from '@store/schemas/questions';
import { saveCard, removeCard, getDeck } from '@api/ServerAPI';
import { Actions as DeckActions } from '@store/modules/decks';

const INITIAL_STATE_COLLECTION = Immutable({});
const INITIAL_STATE_IDS = Immutable([]);

/* Action Types */
export const Types = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  SAVE_REQUEST: 'SAVE_REQUEST',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
  SAVE_FAILURE: 'SAVE_FAILURE',
  DELETE_REQUEST: 'DELETE_REQUEST',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILURE: 'DELETE_FAILURE',
};

const INITIAL_PAYLOAD = null;
/* Actions  */
const {
  fetchSuccess,
  saveRequest,
  saveSuccess,
  saveFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
} = createActions({
  [Types.FETCH_SUCCESS]: (questions, ids) => ({ questions, ids }),
  [Types.SAVE_REQUEST]: INITIAL_PAYLOAD,
  [Types.SAVE_SUCCESS]: (questions, id) => ({ questions, ids: id }),
  [Types.SAVE_FAILURE]: INITIAL_PAYLOAD,
  [Types.DELETE_REQUEST]: INITIAL_PAYLOAD,
  [Types.DELETE_SUCCESS]: (id) => ({ id }),
  [Types.DELETE_FAILURE]: INITIAL_PAYLOAD,
});

export const Actions = {
  fetchSuccess,
  saveRequest,
  saveSuccess,
  saveFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
};

/* Action Creators */
export const Creators = {
  /**
   * @description Add Deck
   * @param {Object} title - Deck`s title
   * @param {Object} question - Question
   * Step 1                - Dispatch SAVE_REQUEST action
   * Step 2.1  - Success   - Dispatch SAVE_SUCCESS action
   * Step 2.2  - Failure   - Dispatch SAVE_FAILURE action
   */
  add: (title, question) => {
    return (dispatch) => {
      dispatch(Actions.saveRequest());
      return saveCard(title, question)
        .then((data) => {
          let normalized = Object.keys(data).map((key) => data[key]);
          const { decks, questions, result: deckIds } = normalize.apply(
            normalized,
            schema,
            'entities.decks',
            'entities.questions',
            'result',
          );

          normalized = Object.keys(questions).map((key) => questions[key]);
          const { questions: cards, result: cardIds } = normalize.apply(
            normalized,
            questionSchema,
            'entities.questions',
            'result',
          );

          dispatch(DeckActions.saveSuccess(decks, deckIds));
          dispatch(Actions.saveSuccess(cards, cardIds));
        })
        .catch((error) => {
          dispatch(Actions.saveFailure(error));
        });
    };
  },
  /**
   * @description Remove Deck
   * @param {Object} title - Deck`s title
   * @param {Object} id - Card id
   * Step 1                - Dispatch DELETE_REQUEST action
   * Step 2.1  - Success   - Dispatch DELETE_SUCCESS action
   * Step 2.2  - Failure   - Dispatch DELETE_FAILURE action
   */
  delete: (title, id) => {
    return (dispatch) => {
      dispatch(Actions.deleteRequest());
      return removeCard(title, id)
        .then(() => {
          return getDeck(title).then((data) => {
            const normalized = Object.keys(data).map((key) => data[key]);
            const { decks, result } = normalize.apply(
              normalized,
              schema,
              'entities.decks',
              'result',
            );
            dispatch(DeckActions.fetchSuccess(decks, result));
            dispatch(Actions.deleteSuccess([id]));
          });
        })
        .catch((error) => {
          dispatch(Actions.saveFailure(error));
        });
    };
  },
};

/* Reducer  */
const collection = handleActions(
  {
    [combineActions(Actions.fetchSuccess, Actions.saveSuccess)]: (state, { payload }) => {
      return Immutable.merge(state, payload.questions);
    },
    [Actions.deleteSuccess]: (state, { payload }) => {
      return Immutable.without(state, payload.id);
    },
  },
  INITIAL_STATE_COLLECTION,
);

const ids = handleActions(
  {
    [combineActions(Actions.fetchSuccess, Actions.saveSuccess)]: (state, { payload }) => {
      return [...state, ...payload.ids];
    },
    [Actions.deleteSuccess]: (state, { payload }) => {
      return state.filter((id) => !payload.id.includes(id));
    },
  },
  INITIAL_STATE_IDS,
);

export default combineReducers({ collection, ids });
