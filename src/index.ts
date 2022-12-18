import express from 'express'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const a = 4;
  if (a > 5) {
    res.send('ok!');
  } else {
    res.send('Hello World!');
  }
});

app.get('/samurai', (req, res) => {
  res.send('Hello Anton!');
});

app.post('/samurai', (req, res) => {
  res.send('we have created samurai');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
