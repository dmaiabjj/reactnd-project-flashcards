import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { createActions, handleActions, combineActions } from 'redux-actions';

import { getDecks, getDeck, saveDeck, removeDeck } from '../../api/ServerAPI';

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
const {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  saveRequest,
  saveSuccess,
  saveFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
} = createActions({
  [Types.FETCH_REQUEST]: INITIAL_PAYLOAD,
  [Types.FETCH_SUCCESS]: INITIAL_PAYLOAD,
  [Types.FETCH_FAILURE]: INITIAL_PAYLOAD,
  [Types.SAVE_REQUEST]: INITIAL_PAYLOAD,
  [Types.SAVE_SUCCESS]: INITIAL_PAYLOAD,
  [Types.SAVE_FAILURE]: INITIAL_PAYLOAD,
  [Types.DELETE_REQUEST]: INITIAL_PAYLOAD,
  [Types.DELETE_SUCCESS]: INITIAL_PAYLOAD,
  [Types.DELETE_FAILURE]: INITIAL_PAYLOAD,
});

export const Actions = {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
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
   * @description Fetch all decks
   * Step 1                - Dispatch FETCH_REQUEST action
   * Step 2.1  - Success   - Dispatch FETCH_SUCCESS action
   * Step 2.2  - Failure   - Dispatch FETCH_FAILURE action
   */
  fetch: () => {
    return (dispatch) => {
      dispatch(Actions.fetchRequest());
      return getDecks()
        .then((decks) => {
          dispatch(Actions.fetchSuccess(decks));
        })
        .catch((error) => {
          dispatch(Actions.fetchFailure(error));
        });
    };
  },
  /**
   * @description Fetch a specific Deck
   * @param {Object} title - Deck`s title
   * Step 1                - Dispatch FETCH_REQUEST action
   * Step 2.1  - Success   - Dispatch FETCH_SUCCESS action
   * Step 2.2  - Failure   - Dispatch FETCH_FAILURE action
   */
  fetchByTitle: (title) => {
    return (dispatch) => {
      dispatch(Actions.fetchRequest());
      return getDeck(title)
        .then((deck) => {
          dispatch(Actions.fetchSuccess(deck));
        })
        .catch((error) => {
          dispatch(Actions.fetchFailure(error));
        });
    };
  },
  /**
   * @description Add Deck
   * @param {Object} title - Deck`s title
   * Step 1                - Dispatch SAVE_REQUEST action
   * Step 2.1  - Success   - Dispatch SAVE_SUCCESS action
   * Step 2.2  - Failure   - Dispatch SAVE_FAILURE action
   */
  add: (title) => {
    return (dispatch) => {
      dispatch(Actions.saveRequest());
      return saveDeck(title)
        .then((deck) => {
          dispatch(Actions.saveSuccess(deck));
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
  delete: (title) => {
    return (dispatch) => {
      dispatch(Actions.deleteRequest());
      return removeDeck(title)
        .then((deck) => {
          dispatch(Actions.deleteSuccess(deck));
        })
        .catch((error) => {
          dispatch(Actions.deleteFailure(error));
        });
    };
  },
};

/* Reducer  */
const collection = handleActions(
  {
    [combineActions(Actions.fetchSuccess, Actions.saveSuccess)]: (state, { payload }) => {
      return Immutable.merge(state, payload);
    },
    [Actions.deleteSuccess]: (state, { payload }) => Immutable.without(state, payload),
  },
  INITIAL_STATE_COLLECTION,
);

const ids = handleActions(
  {
    [combineActions(Actions.fetchSuccess, Actions.saveSuccess)]: (state, { payload }) => {
      return state.concat(Object.keys(payload));
    },
    [Actions.deleteSuccess]: (state, { payload }) => state.filter((d) => d !== payload),
  },
  INITIAL_STATE_IDS,
);

export default combineReducers({ collection, ids });
