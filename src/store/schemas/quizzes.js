import { schema } from 'normalizr';
import questionSchema from '@store/schemas/questions';
/* Criando o schema das entidades quiz para serem normalizadas na biblioteca normalizr */

const quizSchema = new schema.Entity(
  'quizzes',
  {},
  {
    questions: questionSchema,
  },
);

export default new schema.Array(quizSchema);
