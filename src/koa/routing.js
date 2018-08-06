import Router from 'koa-router'

import wifi from './wifi'
import serve from './serve'

const router = new Router()

router.use('/wifi', wifi.routes())

router.get('/**', serve)

export default router
