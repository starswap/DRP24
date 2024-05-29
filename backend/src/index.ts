import express from 'express';
import api from './api';

const app = express();

const PORT = process.env.PORT || 80;
const FRONTEND_PATH = '../../frontend/build';

/* Express Middleware */
// Support JSON incoming to the endpoints
app.use(express.json());
// Serve statically deployed frontend after React compilation
app.use(express.static(FRONTEND_PATH));
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
