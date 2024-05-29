
import express from 'express';

const app = express();

//Express Middleware
app.use(express.json());
app.use(express.static('../frontend/build')); //serve statically deployed frontend after React compilation
