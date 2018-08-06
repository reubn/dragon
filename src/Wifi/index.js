import {Wireless} from 'wirelesser'

export default class Wifi {
  constructor(iface){
    this.iface = iface
    this.wireless = new Wireless(this.iface)
  }

  async scanForSSIDs(){
    const networksOnAir = await this.wireless.scan()

    const groupedBySSID = networksOnAir.reduce((SSIDs, {ssid: SSID, ...other}) => {
      if(SSIDs[SSID]) SSIDs[SSID].push({...other})
      else SSIDs[SSID] = [{...other}]

      return SSIDs
    }, {})

    return Object.entries(groupedBySSID)
      .reduce((reformatted, [SSID, networkArray]) => [
        ...reformatted, {
          SSID,
          networks: networkArray.sort(({signal: a}, {signal: b}) => b - a)
        }], [])
      .sort(({networks: [{signal: a}]}, {networks: [{signal: b}]}) => b - a)
  }
}
