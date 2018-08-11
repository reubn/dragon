import wifi from '../../wifi'

export default async ctx => {
  ctx.body = {}
  wifi.status()
}
