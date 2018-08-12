import wifi from '../../wifi'

export default async ctx => {
  ctx.body = await wifi.changeMAC(ctx.request.body.MAC)
}
