const app = require('./app');
const wakeUpDyno = require('./utils/wakeUpDyno');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
const DYNO_URL = 'https://my-contacts-didistf.herokuapp.com'; // the url of my heroku app dyno

app.listen(PORT, () => {
  wakeUpDyno(DYNO_URL); // will start once server starts
  console.log(`Server running in ${ENV} mode on port ${PORT}`.cyan.bold);
});
