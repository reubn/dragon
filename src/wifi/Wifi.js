import {Wireless} from 'wirelesser'

import {accessPointIface} from '../config'

import ifconfig from './ifconfig'

export default class Wifi {
  constructor(iface){
    this.iface = iface
    this.wireless = new Wireless(this.iface)
  }

  // Search Interfaces for that of our Access Point, so that it can be removed from SSIDs shown
  accessPointWifiAddress = Wifi.listInterfaces().then(ifaces => (ifaces.find(({iface: ifaceA}) => ifaceA === accessPointIface)||{}).address)

  scanCache = {}

  async scanForSSIDs(){
    const cacheTime = 10 * 1000
    if(this.scanCache.staleAt && this.scanCache.staleAt > Date.now()) return this.scanCache.scan

    const accessPointWifiAddress = await this.accessPointWifiAddress
    const networksOnAir = await this.wireless.scan()

    const groupedBySSID = networksOnAir.reduce((SSIDs, {ssid: SSID, address, ...other}) => ((address === accessPointWifiAddress) ? SSIDs : {
      ...SSIDs,
      [SSID]: [...(SSIDs[SSID] || []), {address, ...other}]
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

  async status(){
    const status = await this.wireless.status()

    const state = do {
      if(status.wpa_state === 'INACTIVE') 'inactive'
      else if(status.wpa_state === 'COMPLETED') 'connected'
      else if(status.wpa_state === 'DISCONNECTED' && status.ip_address) 'ap'
      else if(status.wpa_state === 'DISCONNECTED') 'disconnected'
      else null
    }

    const final = {...status, state}

    return final
  }

  static async listInterfaces(){
    return new Promise((res, rej) => ifconfig.status((err, result) => err ? rej(err) : res(result)))
  }
}
