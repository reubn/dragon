import {PassThrough} from 'stream'
import symbolDesc from 'symbol-description'
import wifi from '../../wifi'

export default ctx => {
  const stream = new PassThrough()

  ctx.req.on('close', () => ctx.res.end());
  ctx.req.on('finish', () => ctx.res.end());
  ctx.req.on('error', () => ctx.res.end());
  ctx.type = 'text/event-stream';
  ctx.body = stream;

  const listener = (event, data) => {
    const string = JSON.stringify({event: symbolDesc(event), data})
    stream.write(`data: ${string}\n\n`)
  }

  wifi.on(wifi.events.all, listener)
  ctx.req.socket.on('close', () => wifi.removeListener(wifi.events.all, listener))
}
