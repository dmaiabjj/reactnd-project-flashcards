/*
import { saveCard, removeCard } from '@api/ServerAPI';
import { createAction, handleActions } from 'redux-actions';

import _ from 'lodash';

const INITIAL_STATE = {
  cards: {},
  ids: [],
};


export const Types = {
  FETCH_REQUEST: 'CARD/FETCH_REQUEST',
  FETCH_SUCCESS: 'CARD/FETCH_SUCCESS',
  FETCH_FAILURE: 'CARD/FETCH_FAILURE',
  SAVE_REQUEST: 'CARD/SAVE_REQUEST',
  SAVE_SUCCESS: 'CARD/SAVE_SUCCESS',
  SAVE_FAILURE: 'CARD/SAVE_FAILURE',
  DELETE_REQUEST: 'CARD/DELETE_REQUEST',
  DELETE_SUCCESS: 'CARD/DELETE_SUCCESS',
  DELETE_FAILURE: 'CARD/DELETE_FAILURE',
};


export const Actions = {
  fetchRequest: createAction(Types.FETCH_REQUEST),
  fetchRequestSuccess: createAction(Types.FETCH_SUCCESS),
  fetchRequestFailure: createAction(Types.FETCH_FAILURE),
  saveRequest: createAction(Types.SAVE_REQUEST),
  saveRequestSuccess: createAction(Types.SAVE_SUCCESS),
  saveRequestFailure: createAction(Types.SAVE_FAILURE),
  removeRequest: createAction(Types.DELETE_REQUEST),
  removeRequestSucess: createAction(Types.DELETE_SUCCESS),
  removeRequestFailure: createAction(Types.DELETE_FAILURE),
};


export default handleActions(
  {
    [Types.FETCH_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload.cards,
      ids: Object.keys(payload.cards),
    }),
    [Types.SAVE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload.card,
      ids: [...state.ids, payload.card.id],
    }),
    [Types.DELETE_SUCCESS]: (state, { payload }) => _.omit(state, payload.id),
  },
  INITIAL_STATE,
);

*/
