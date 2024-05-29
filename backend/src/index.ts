import express from 'express';

const app = express();

const PORT = process.env.port || 8080;

//Express Middleware
app.use(express.json());
app.use(express.static('../frontend/build')); //serve statically deployed frontend after React compilation

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
