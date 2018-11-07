/*
import { handleActions, combineActions } from 'redux-actions';
import { Actions as ActionDeck } from '@store/modules/decks';
import { Actions as ActionCard } from '@store/modules/cards';

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  error: null,
};


export default handleActions(
  {
    [combineActions(
      ActionDeck.fetchRequest,
      ActionDeck.saveRequest,
      ActionDeck.removeRequest,
      ActionCard.fetchRequest,
      ActionCard.saveRequest,
      ActionCard.removeRequest,
    )]: (state) => ({
      ...state,
      fetched: false,
      fetching: true,
      error: null,
    }),
    [combineActions(
      ActionDeck.fetchRequestSuccess,
      ActionDeck.saveRequestSuccess,
      ActionDeck.removeRequestSucess,
      ActionCard.fetchRequestSuccess,
      ActionCard.saveRequestSuccess,
      ActionCard.removeRequestSucess,
    )]: (state) => ({
      ...state,
      fetched: true,
      fetching: false,
    }),
    [combineActions(
      ActionDeck.fetchRequestFailure,
      ActionDeck.saveRequestFailure,
      ActionDeck.removeRequestFailure,
      ActionCard.fetchRequestFailure,
      ActionCard.saveRequestFailure,
      ActionCard.removeRequestFailure,
    )]: (state, { payload }) => ({
      ...state,
      fetched: false,
      fetching: true,
      error: payload.error,
    }),
  },
  INITIAL_STATE,
);

*/
