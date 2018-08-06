import {Wireless} from 'wirelesser'

export default class Wifi {
  constructor(iface){
    this.iface = iface
    this.wireless = new Wireless(this.iface)

    this.scanCache = {}
  }

  async scanForSSIDs(){
    const cacheTime = 10 * 1000
    if(this.scanCache.staleAt && this.scanCache.staleAt > Date.now()) return this.scanCache.scan

    const networksOnAir = await this.wireless.scan()

    const groupedBySSID = networksOnAir.reduce((SSIDs, {ssid: SSID, ...other}) => ({
      ...SSIDs,
      [SSID]: [...(SSIDs[SSID] || []), {...other}]
    }), {})

    const scan = Object.entries(groupedBySSID)
      .reduce((reformatted, [SSID, networkArray]) => [
        ...reformatted, {
          SSID,
          networks: networkArray.sort(({signal: a}, {signal: b}) => b - a)
        }], [])
      .sort(({networks: [{signal: a}]}, {networks: [{signal: b}]}) => b - a)

    this.scanCache = {
      scan,
      staleAt: Date.now() + cacheTime
    }

    return scan
  }
}
