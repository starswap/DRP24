import { Router } from 'express';

const apiRouter = Router();

apiRouter.route('/healthcheck').get(async (req, res) => {
  res.status(200);
  return res.send({ success: true });
});

export default apiRouter;
