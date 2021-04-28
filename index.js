/* eslint-disable no-undef */
require('dotenv').config();
const app = require('./src/server');


app.listen(process.env.PORT, () => {
  console.log(`Server listening on address http://localhost:${process.env.PORT}`);
});

