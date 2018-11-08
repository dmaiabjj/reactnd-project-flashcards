import Immutable from 'seamless-immutable';
import reducer from '@store/modules/app';
import { Actions as DeckActions } from '@store/modules/decks';
import { Actions as CardActions } from '@store/modules/questions';

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
    expect(reducer(INITIAL_STATE, DeckActions.fetchRequest())).toEqual({
      fetching: true,
      fetched: false,
      error: null,
    });
  });

  it('[REDUCERS] should handle SUCCESS', () => {
    expect(reducer(INITIAL_STATE, DeckActions.saveSuccess())).toEqual({
      fetching: false,
      fetched: true,
      error: null,
    });
  });

  it('[REDUCERS] should handle FAILURE', () => {
    expect(reducer(INITIAL_STATE, CardActions.saveFailure(props.error))).toEqual({
      fetching: false,
      fetched: true,
      error: props.error,
    });
  });

  /* REDUCERS */
});
