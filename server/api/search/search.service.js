// Very basic, Kishore to improve :)

import client from '../../core/es';

export const tenantById = (id) => (
  client.get({
    index: 'transporter-collection',
    type: 'tenants',
    id: id
  }).then((res) => res._source)
);
