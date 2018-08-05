import Router from 'koa-router'

import serve from './serve'

const router = new Router()

router.get('/', async ctx => {
  ctx.body = 'Hola!'
})

router.get('/**', serve)

export default router
