import {PassThrough} from 'stream'
import symbolDesc from 'symbol-description'
import wifi from '../../wifi'

export default ctx => {
  const stream = new PassThrough()
  const listener = (event, data) => {
    const string = JSON.stringify({event: symbolDesc(event), data})
    stream.write(`data: ${string}\n\n`)
  }

  ctx.req.on('close', () => {
    ctx.res.end()
    wifi.removeListener(wifi.events.all, listener)
  });
  ctx.req.on('finish', () => {
    ctx.res.end()
    wifi.removeListener(wifi.events.all, listener)
  });
  ctx.req.on('error', () => {
    ctx.res.end()
    wifi.removeListener(wifi.events.all, listener)
  });
  ctx.type = 'text/event-stream';
  ctx.body = stream;

  wifi.on(wifi.events.all, listener)
}
