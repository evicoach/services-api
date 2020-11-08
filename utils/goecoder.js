const NodeGeocoder = require('node-geocoder');

const options = {
  // provider: process.env.GEOCODER_PROVIDER,
  provider: 'mapquest',

  // Optional depending on the providers
  httpAdapter: 'https',
  apiKey: 'xpd8fPTbqgZiUaYRWWNAUbh3cxCX8WXM',
  // apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;