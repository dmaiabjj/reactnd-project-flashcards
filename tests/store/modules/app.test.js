import Immutable from 'seamless-immutable';
import reducer from '@store/modules/app';
import { Actions as DeckActions } from '@store/modules/decks';
import { Actions as QuestionActions } from '@store/modules/questions';

const INITIAL_STATE = Immutable({
  fetching: false,
  fetched: false,
  error: null,
});

describe('MODULE - APP', () => {
  const props = {
    error: new Error('Something went wrong'),
  };

  /* REDUCERS */

  it('[REDUCERS] should handle initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('[REDUCERS] should handle REQUEST', () => {
    expect(reducer(INITIAL_STATE, DeckActions.deck.fetchRequest())).toEqual({
      fetching: true,
      fetched: false,
      error: null,
    });
  });

  it('[REDUCERS] should handle SUCCESS', () => {
    expect(reducer(INITIAL_STATE, DeckActions.deck.saveSuccess())).toEqual({
      fetching: false,
      fetched: true,
      error: null,
    });
  });

  it('[REDUCERS] should handle FAILURE', () => {
    expect(reducer(INITIAL_STATE, QuestionActions.question.saveFailure(props.error))).toEqual({
      fetching: false,
      fetched: true,
      error: props.error,
    });
  });

  /* REDUCERS */
});
