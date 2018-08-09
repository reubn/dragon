import bodyParser from 'koa-bodyparser'

import router from './routing'

export default app => {
  // Parse JSON Bodies
  app.use(bodyParser({enableTypes: ['json']}))

  // Routing
  app.use(router.routes())
}
