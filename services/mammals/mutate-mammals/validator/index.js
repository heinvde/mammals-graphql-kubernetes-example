const { createApp } = require('./libs/app');

const config = {
  VALIDATOR_PORT: process.env.VALIDATOR_PORT || 5000,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT
};

// Start application
createApp({ config }).then(app => {
  const port = config.VALIDATOR_PORT;

  app.listen(port, () => {
    console.log(`Mutate mammals validator running on ${port}`)
  })
});
