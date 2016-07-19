module.exports = function() {
  switch(process.env.NODE_ENV) {
    case 'development':
      return {
        env: process.env.NODE_ENV,
        RIOT_API_KEY: 'your riot api key'
      };
    case 'production':
      return {
        env: process.env.NODE_ENV,
        RIOT_API_KEY: 'your riot api key'
      };
    default:
      console.log('config error'); // need to set default error
  }
}