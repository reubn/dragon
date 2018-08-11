import wifi from '../../wifi'

export default async ctx => {
  ctx.body = {}
  wifi.connect(ctx.request.body)
}
