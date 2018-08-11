import wifi from '../../wifi'

export default async ctx => {
  ctx.body = {}
  wifi.changeMAC(ctx.request.body.MAC)
}
