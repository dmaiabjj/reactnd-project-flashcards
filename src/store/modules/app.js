import { handleActions, combineActions } from 'redux-actions';
import Immutable from 'seamless-immutable';

import { Actions as ActionDeck } from '@store/modules/decks';
import { Actions as ActionQuestion } from '@store/modules/questions';

const INITIAL_STATE = Immutable({
  fetching: false,
  fetched: false,
  error: null,
});

export default handleActions(
  {
    [combineActions(
      ActionDeck.deck.fetchRequest,
      ActionDeck.deck.saveRequest,
      ActionDeck.deck.deleteRequest,
      ActionQuestion.question.saveRequest,
      ActionQuestion.question.deleteRequest,
    )]: (state) => ({
      ...state,
      fetched: false,
      fetching: true,
      error: null,
    }),
    [combineActions(
      ActionDeck.deck.fetchSuccess,
      ActionDeck.deck.saveSuccess,
      ActionDeck.deck.deleteSuccess,
      ActionQuestion.question.saveSuccess,
      ActionQuestion.question.deleteSuccess,
    )]: (state) => ({
      ...state,
      fetched: true,
      fetching: false,
    }),
    [combineActions(
      ActionDeck.deck.fetchFailure,
      ActionDeck.deck.saveFailure,
      ActionDeck.deck.deleteFailure,
      ActionQuestion.question.saveFailure,
      ActionQuestion.question.deleteFailure,
    )]: (state, { payload }) => ({
      ...state,
      fetched: true,
      fetching: false,
      error: payload,
    }),
  },
  INITIAL_STATE,
);
