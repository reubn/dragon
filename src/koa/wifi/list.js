import wifi from '../../wifi'

export default async ctx => {
  console.log('At Route')
  ctx.body = await wifi.scanForSSIDs()
}
