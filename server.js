const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./src/app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`pdfnet listening at http://localhost:${port}`);
});