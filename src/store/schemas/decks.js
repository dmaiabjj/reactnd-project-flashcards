import { schema } from 'normalizr';
import CardSchema from '@store/schemas/cards';
/* Criando o schema das entidades deck para serem normalizadas na biblioteca normalizr */
const deckSchema = new schema.Entity(
  'decks',
  {
    questions: [CardSchema],
  },
  { idAttribute: (entity) => entity.title },
);

export default new schema.Array(deckSchema);
