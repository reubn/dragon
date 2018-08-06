import Router from 'koa-router'

import serve from './serve'

const router = new Router()


router.get('/**', serve)

export default router
