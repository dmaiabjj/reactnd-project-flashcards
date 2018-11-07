import { schema } from 'normalizr';
/* Criando o schema das entidades cards para serem normalizadas na biblioteca normalizr */

const cardSchema = new schema.Entity('questions');

export default new schema.Array(cardSchema);
