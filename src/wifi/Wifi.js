import {exec} from 'child-process-promise'
import {Wireless, Monitor} from 'wirelesser'
import iwconfig from 'wireless-tools/iwconfig'

import {accessPointIface, scanCacheTime, monitorUpdateFrequency, connectStatusUpdateDelay} from '../config'

import BetterEvents from './BetterEvents'
import ifconfig from './ifconfig'

export default class Wifi extends BetterEvents {
  constructor(iface){
    super()

    this.iface = iface

    this.wireless = new Wireless(this.iface)
    this.monitor = new Monitor(this.iface)

    this.monitor.on('data', (...args) => this._handleMonitor(...args))
  }

  // Search Interfaces for that of our Access Point, so that it can be removed from SSIDs shown
  accessPointWifiAddress = Wifi.listInterfaces().then(ifaces => (ifaces.find(({iface: ifaceA}) => ifaceA === accessPointIface)||{}).address)

  scanCache = {}

  events = {
    ...super.events,
    scan: Symbol('scan'),
    status: Symbol('status'),
    knownSSIDs: Symbol('knownSSIDs')
  }

  async _handleMonitor(args){
    const status = await this.status()
    console.log(args, status.state, status.wpa_state)

    if(args.startsWith('<3>CTRL-EVENT-CONNECTED')) setTimeout(async () => this.emit(this.events.status, await this.status()), connectStatusUpdateDelay)
    this.emit(this.events.status, status)
  }

  async SSIDscan(){
    if(this.scanCache.staleAt && this.scanCache.staleAt > Date.now()) return this.scanCache.scan

    const knownSSIDs = await this.wireless.listNetworks()
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
          known: knownSSIDs.find(({ssid: knownSSID}) => SSID === knownSSID) || false,
          networks: networkArray.sort(({signal: a}, {signal: b}) => b - a)
        }], [])
      .sort(({networks: [{signal: a}]}, {networks: [{signal: b}]}) => b - a)

    this.scanCache = {
      scan,
      staleAt: Date.now() + scanCacheTime
    }

    this.emit(this.events.scan, scan)

    return scan
  }

  async status(){
    const iwconfigPromise = new Promise((res, rej) => iwconfig.status(this.iface, (err, data) => err ? rej(err) : res(data)))
    const [wirelessStatus, {noise, quality, sensitivity, signal}={}] = await Promise.all([this.wireless.status(), iwconfigPromise])

    const state = do {
      if(wirelessStatus.wpa_state === 'INACTIVE') 'inactive'
      if(wirelessStatus.wpa_state === 'SCANNING') 'scanning'
      else if(wirelessStatus.wpa_state === 'COMPLETED') 'connected'
      else if(wirelessStatus.wpa_state === 'DISCONNECTED' && wirelessStatus.ip_address) 'ap'
      else if(wirelessStatus.wpa_state === 'DISCONNECTED') 'disconnected'
      else null
    }

    const final = {
      ...wirelessStatus,
      state,
      noise,
      quality,
      sensitivity,
      signal
    }

    return final
  }

  async connect({SSID, password, id}={}){
    if(typeof id === 'number') {
      await this.wireless.enableNetwork(id)
      await this.wireless.selectNetwork(id)
      return await this.wireless.saveConfiguration()
    }

    if(!SSID) return {error: true}

    if(!password) console.log('No Password Supplied for', SSID)

    return this.wireless.connect(SSID, password)
  }

  async disconnect(){
    return this.wireless.disconnect()
  }

  async changeMAC(MAC){
    await this.wireless.down()
    const result = await exec(['macchanger', MAC ? `-m ${MAC}` : '-A', this.iface].join(' '))
    await this.wireless.up()

    console.log(result)
    return result
  }

  async knownSSIDs(){
    const list = await this.wireless.listNetworks()
    const networks = list.map(({ssid: SSID, flags, ...other}) => ({
      SSID,
      flags: flags
        .split(']')
        .map(p => p.replace('[', ''))
        .filter(a => a),
      ...other
    }))

    return networks
  }

  static async listInterfaces(){
    return new Promise((res, rej) => ifconfig.status((err, result) => err ? rej(err) : res(result)))
  }
}
