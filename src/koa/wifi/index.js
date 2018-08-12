import Router from 'koa-router'

import events from './events'
import scan from './scan'
import status from './status'
import SSIDs from './SSIDs'

import connect from './connect'
import disconnect from './disconnect'
import mac from './mac'

const router = new Router()

router.get('/events', events)

router.get('/scan', scan)
router.get('/status', status)
router.get('/SSIDs', SSIDs)

router.post('/connect', connect)
router.post('/disconnect', disconnect)
router.post('/mac', mac)

export default router
