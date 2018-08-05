import server from './server'
import Wifi from './Wifi'

// Start Server
server()

// Wifi
const wifi = new Wifi('wlan1')

wifi.scanForSSIDs().then(console.log)
