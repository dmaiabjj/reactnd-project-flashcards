import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { createActions, handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import _ from 'lodash';
import normalize from '@helpers/normalize';
import schema from '@store/schemas';
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
        .then((data) => {
          const normalized = Object.keys(data).map((key) => data[key]);
          const { decks, result } = normalize.apply(normalized, schema, 'entities.decks', 'result');
          dispatch(Actions.fetchSuccess({ decks, ids: result }));
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
        .then((data) => {
          const normalized = Object.keys(data).map((key) => data[key]);
          const { decks, result } = normalize.apply(normalized, schema, 'entities.decks', 'result');
          dispatch(Actions.fetchSuccess({ decks, ids: result }));
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
        .then((data) => {
          const normalized = Object.keys(data).map((key) => data[key]);
          const { decks, result } = normalize.apply(normalized, schema, 'entities.decks', 'result');
          dispatch(Actions.saveSuccess({ decks, ids: result }));
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
        .then(() => {
          dispatch(Actions.deleteSuccess({ id: title }));
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
      return Immutable.merge(state, payload.decks);
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
      return state.filter((id) => id !== payload.id);
    },
  },
  INITIAL_STATE_IDS,
);

/* SELECTORS */

const decksEntitiesSelector = (state) => {
  return {
    decks: state.collection,
    subjects: state.ids,
  };
};

/**
 * @description
 * Returns all decks inside an array
 *
 * @returns {Function} Returns a function that will receive the state and return an array with all
 * decks
 */
export const getAll = () => {
  return createSelector(
    decksEntitiesSelector,
    ({ decks, subjects }) => {
      return subjects && _.orderBy(subjects.map((id) => decks[id]));
    },
  );
};

/* SELECTORS */

export default combineReducers({ collection, ids });
