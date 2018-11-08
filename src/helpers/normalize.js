import _ from 'lodash';
import { normalize } from 'normalizr';

export default {
  apply: (data, schema, ...params) => {
    const normalized = normalize(data, schema);

    const result = params.reduce((acc, param) => {
      const id = param.split('.').pop();

      return Object.assign(acc, { [id]: _.get(normalized, param, {}) });
    }, {});

    return result;
  },
};
