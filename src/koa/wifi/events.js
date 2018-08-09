import symbolDesc from 'symbol-description'
import wifi from '../../wifi'

export default async ctx => {
  const listener = (event, data) => ctx.sse.send(JSON.stringify({event: symbolDesc(event), data}))

  wifi.on(wifi.events.all, listener)

  ctx.req.socket.on('close', () => wifi.removeListener(wifi.events.all, listener))
}
