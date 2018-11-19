import Immutable from 'seamless-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, { Actions, Types, Creators } from '@store/modules/theme';

const INITIAL_STATE = Immutable({ theme: 'light' });

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  INITIAL_STATE,
});

describe('MODULE - THEME', () => {
  const props = {
    theme: {
      dark: 'dark',
      light: 'light',
    },
    error: new Error('Something went wrong'),
  };

  /* ACTIONS  */

  it('[ACTIONS] verify all actions creators', () => {
    expect(Actions.changeTheme(props.theme.dark)).toEqual({
      type: Types.CHANGE_THEME,
      payload: props.theme.dark,
    });
  });

  /* ACTIONS  */

  /* ACTION CREATORS  */
  it('[ACTION CREATORS] should dispatch a CHANGE_THEME action ', async () => {
    const expectedActions = [Actions.changeTheme(props.theme.dark)];

    store.dispatch(Creators.changeTheme(props.theme.dark));
    return expect(store.getActions()).toEqual(expectedActions);
  });

  /* ACTION CREATORS  */

  /* REDUCERS */
  it('[REDUCERS] should handle initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('[REDUCERS] should handle CHANGE_THEME action ', () => {
    const expected = { payload: props.theme.dark };
    expect(reducer(INITIAL_STATE, Actions.changeTheme(props.theme.dark))).toEqual(expected);
  });
  /* REDUCERS */
});
