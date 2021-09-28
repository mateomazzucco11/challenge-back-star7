const app = require('./src/app');

require('dotenv').config();

const { NODE_PORT } = process.env;

app.listen(NODE_PORT, () => {
  console.log(`server working in localhost:${NODE_PORT}`);
});