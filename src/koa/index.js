import Koa from 'koa'

import middleware from './middleware'

const koa = new Koa()

middleware(koa)

export default koa
