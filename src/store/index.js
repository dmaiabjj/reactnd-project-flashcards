import { createStore } from 'redux';
import middlewares from '@store/middlewares';
import reducer from '@store/modules';

const store = createStore(reducer, middlewares);

export default store;
