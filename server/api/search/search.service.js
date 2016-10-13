import client from '../../core/es';

const PER_PAGE = 20;
export const tenantById = (id) => (
  client.get({
    index: 'transporter-collection',
    type: 'tenants',
    id
  }).then((res) => res._source)
);

// On mouse over on a map marker needs to show a popup
// TBD export const propertyById
export const propertyByLocality = (query, filters, options) => {
  const { pageNum, geo, lat, lon } = options;
  const searchParams = {
    index: 'property',
    from: (pageNum - 1) * PER_PAGE,
    size: PER_PAGE,
    body: {
      query: {
        filtered: {
          query: {
            match: { ...query } // expecting they are built in client side
          },
          filter: { ...filters }
        }
      }
    }
  };

  if (geo) {
    // TODO append geo guery
    console.log(lat, lon);
  }

  client.search(searchParams, (err, res) => {
    if (err) {
      // handle error
      throw err;
    }
    return res;
  });
};
