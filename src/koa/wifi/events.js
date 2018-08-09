import symbolDesc from 'symbol-description'
import wifi from '../../wifi'

export default async ctx => {
  wifi.on(wifi.events.all, (event, data) => ctx.sse.send(JSON.stringify({event: symbolDesc(event), data})))

  ctx.req.socket.on('close', () => ctx.sse.end())
}
