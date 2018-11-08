import { schema } from 'normalizr';
/* Criando o schema das entidades cards para serem normalizadas na biblioteca normalizr */

const questionSchema = new schema.Entity('questions', {});

export default new schema.Array(questionSchema);
