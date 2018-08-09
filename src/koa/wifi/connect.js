import wifi from '../../wifi'

export default async ctx => {
  ctx.body = await wifi.connect(ctx.request.body)
}
