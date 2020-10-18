const app = require('./app');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${ENV} mode on port ${PORT}`.cyan.bold)
);
