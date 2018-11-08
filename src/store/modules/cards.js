import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { createActions, handleActions } from 'redux-actions';

import normalize from '@helpers/normalize';
import schema from '@store/schemas';
import cardSchema from '@store/schemas/cards';
import { saveCard, removeCard } from '@api/ServerAPI';
import { Actions as DeckActions } from '@store/modules/decks';
import { getDeck } from '../../api/ServerAPI';

const INITIAL_STATE_COLLECTION = Immutable({});
const INITIAL_STATE_IDS = Immutable([]);

/* Action Types */
export const Types = {
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
  saveRequest,
  saveSuccess,
  saveFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
} = createActions({
  [Types.SAVE_REQUEST]: INITIAL_PAYLOAD,
  [Types.SAVE_SUCCESS]: INITIAL_PAYLOAD,
  [Types.SAVE_FAILURE]: INITIAL_PAYLOAD,
  [Types.DELETE_REQUEST]: INITIAL_PAYLOAD,
  [Types.DELETE_SUCCESS]: INITIAL_PAYLOAD,
  [Types.DELETE_FAILURE]: INITIAL_PAYLOAD,
});

export const Actions = {
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
   * Step 1                - Dispatch SAVE_REQUEST action
   * Step 2.1  - Success   - Dispatch SAVE_SUCCESS action
   * Step 2.2  - Failure   - Dispatch SAVE_FAILURE action
   */
  add: (title, card) => {
    return (dispatch) => {
      dispatch(Actions.saveRequest());
      return saveCard(title, card)
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
            questions,
            cardSchema,
            'entities.questions',
            'result',
          );

          dispatch(DeckActions.saveSuccess({ decks, ids: deckIds }));
          dispatch(Actions.saveSuccess({ cards, ids: cardIds }));
        })
        .catch((error) => {
          dispatch(Actions.saveFailure(error));
        });
    };
  },
  /**
   * @description Remove Deck
   * @param {Object} title - Deck`s title
   * Step 1                - Dispatch DELETE_REQUEST action
   * Step 2.1  - Success   - Dispatch DELETE_SUCCESS action
   * Step 2.2  - Failure   - Dispatch DELETE_FAILURE action
   */
  delete: (title, card) => {
    return (dispatch) => {
      dispatch(Actions.deleteRequest());
      return removeCard(title, card)
        .then(() => {
          return getDeck(title).then((data) => {
            const normalized = Object.keys(data).map((key) => data[key]);
            const { decks, result } = normalize.apply(
              normalized,
              schema,
              'entities.decks',
              'result',
            );
            dispatch(DeckActions.fetchSuccess({ decks, ids: result }));
            dispatch(Actions.deleteSuccess({ id: card }));
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
    [Actions.saveSuccess]: (state, { payload }) => {
      return Immutable.merge(state, payload.cards);
    },
    [Actions.deleteSuccess]: (state, { payload }) => {
      return Immutable.without(state, payload.id);
    },
  },
  INITIAL_STATE_COLLECTION,
);

const ids = handleActions(
  {
    [Actions.saveSuccess]: (state, { payload }) => {
      return state.concat(payload.ids);
    },
    [Actions.deleteSuccess]: (state, { payload }) => {
      return state.filter((id) => id !== payload.id);
    },
  },
  INITIAL_STATE_IDS,
);

export default combineReducers({ collection, ids });
