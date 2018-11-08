import { schema } from 'normalizr';
import questionSchema from '@store/schemas/questions';
import quizzSchema from '@store/schemas/quizzes';
/* Criando o schema das entidades deck para serem normalizadas na biblioteca normalizr */
const deckSchema = new schema.Entity(
  'decks',
  {
    questions: questionSchema,
    quizzes: quizzSchema,
  },
  { idAttribute: (entity) => entity.title },
);

export default new schema.Array(deckSchema);
