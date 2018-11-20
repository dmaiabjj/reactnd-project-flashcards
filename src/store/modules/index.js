import { combineReducers } from 'redux';
import app from '@store/modules/app';
import decks from '@store/modules/decks';
import questions from '@store/modules/questions';
import quizzes from '@store/modules/quizzes';
import themes from '@store/modules/themes';

export default combineReducers({
  app,
  decks,
  questions,
  quizzes,
  themes,
});
