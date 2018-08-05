import http from 'http'

import {httpPort} from './config'
import koa from './koa'

export default () => http.createServer(koa.callback()).listen(httpPort)
