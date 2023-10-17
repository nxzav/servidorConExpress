import express from "express";

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('<h1>Servidor con Express</h1>');
});

app.get('/products', (req, res) => {
  const {limit} = req.query;
  console.log(limit);
  return res.json();
})

app.listen(port, () => {
  console.log('Server running on port ', port);
});