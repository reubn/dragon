import Router from 'koa-router'
import sse from 'koa-sse-stream'

import events from './events'
import list from './list'
import status from './status'

const router = new Router()

router.use('/events', sse())
router.get('/events', events)

router.get('/list', list)
router.get('/status', status)

export default router
