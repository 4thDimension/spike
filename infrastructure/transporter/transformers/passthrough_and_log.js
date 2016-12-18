module.exports = function(doc) {
  console.log(doc.ns);
  console.log('transformer: ', JSON.stringify(doc));
  return doc;
};
