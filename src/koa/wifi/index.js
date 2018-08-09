import Router from 'koa-router'

import list from './list'
import status from './status'

const router = new Router()

router.get('/list', list)
router.get('/status', status)

export default router
