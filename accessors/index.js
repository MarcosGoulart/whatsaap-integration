// @ts-check

const { createStorage } = require('./storageFactory');
const DefaultAccessors = require('./DefaultAccessors');

module.exports = new DefaultAccessors(createStorage());
