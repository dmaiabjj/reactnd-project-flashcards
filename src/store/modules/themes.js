import { createActions, handleActions, combineActions } from 'redux-actions';
import Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable({
  theme: 'light',
});

/* Action Types */
export const Types = {
  CHANGE_THEME: 'CHANGE_THEME',
};

const INITIAL_PAYLOAD = null;
/* Actions  */
const { changeTheme } = createActions({
  [Types.CHANGE_THEME]: INITIAL_PAYLOAD,
});

export const Actions = {
  changeTheme,
};

/* Action Creators */
export const Creators = {
  /**
   * @description Change Theme
   * Step 1                - Dispatch CHANGE_THEME action
   */
  changeTheme: (theme) => {
    return (dispatch) => {
      dispatch(Actions.changeTheme(theme));
    };
  },
};

export default handleActions(
  {
    [combineActions(Actions.changeTheme)]: (state, { payload }) => ({
      payload,
    }),
  },
  INITIAL_STATE,
);
