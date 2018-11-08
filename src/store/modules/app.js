import { handleActions, combineActions } from 'redux-actions';
import { Actions as ActionDeck } from '@store/modules/decks';
import { Actions as ActionCard } from '@store/modules/questions';

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
      ActionDeck.deleteRequest,
      ActionCard.saveRequest,
      ActionCard.deleteRequest,
    )]: (state) => ({
      ...state,
      fetched: false,
      fetching: true,
      error: null,
    }),
    [combineActions(
      ActionDeck.fetchSuccess,
      ActionDeck.saveSuccess,
      ActionDeck.deleteSuccess,
      ActionCard.saveSuccess,
      ActionCard.deleteSuccess,
    )]: (state) => ({
      ...state,
      fetched: true,
      fetching: false,
    }),
    [combineActions(
      ActionDeck.fetchFailure,
      ActionDeck.saveFailure,
      ActionDeck.deleteFailure,
      ActionCard.saveFailure,
      ActionCard.deleteFailure,
    )]: (state, { payload }) => ({
      ...state,
      fetched: true,
      fetching: false,
      error: payload,
    }),
  },
  INITIAL_STATE,
);
