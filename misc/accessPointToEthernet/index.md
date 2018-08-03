# Run
  `sudo apt-get update`
  `sudo apt-get upgrade`

# Restart

# Run
  `sudo apt-get install hostapd`
  `sudo apt-get install dnsmasq`

# Transfer Content of Files
  `dhcpcd.conf` -> `/etc/dhcpcd.conf`
  `hostapd.conf` -> `/etc/hostapd/hostapd.conf`
  `dnsmasq.conf` -> `/etc/dnsmasq.conf`
  `iptables.ipv4.nat` -> `/etc/iptables.ipv4.nat`
  `interfaces` -> `/etc/network/interfaces`

# Run
  `sudo service dhcpcd restart`

# Replace
`#DAEMON_CONF=""` with `DAEMON_CONF="/etc/hostapd/hostapd.conf"` in `/etc/default/hostapd`
`DAEMON_CONF=""` with `DAEMON_CONF="/etc/hostapd/hostapd.conf"` in `/etc/init.d/hostapd`
`#net.ipv4.ip_forward=1` with `net.ipv4.ip_forward=1` in `/etc/sysctl.conf`
`exit 0` with `iptables-restore < /etc/iptables.ipv4.nat
exit 0` in `/etc/rc.local`

# Run
  `sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"`
  `iptables-restore < /etc/iptables.ipv4.nat`
  `sudo service hostapd start`
  `sudo service dnsmasq start`
  `sudo reboot`
