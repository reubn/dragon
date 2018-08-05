import {Wireless} from 'wirelesser'

export default class Wifi {
  constructor(iface){
    this.iface = iface
    this.wireless = new Wireless(this.iface)
  }

  async scanForSSIDs(){
    const networksOnAir = await this.wireless.scan()

    return networksOnAir.reduce((SSIDs, {ssid: SSID, ...other}) => {
      if(SSIDs[SSID]) SSIDs[SSID].push({SSID, ...other})
      else SSIDs[SSID] = [{SSID, ...other}]

      return SSIDs
    }, {})
  }
}
