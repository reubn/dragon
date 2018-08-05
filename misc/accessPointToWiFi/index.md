# Preparation
  - Plug in Ethernet Cable
  - Change pi password
  - Change hostname to `dragon`

# Package Setup
  `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
  `sudo apt update`
  `sudo apt upgrade`
  `sudo reboot`
  `sudo apt install hostapd dnsmasq macchanger nodejs git tmux` // No to automatic mac changing

# Create Directory Structure
  `mkdir /home/pi/dragon_dev`
  `mkdir /home/pi/dragon_dev/repo.git`
  `mkdir /home/pi/dragon_dev/app`

# Transfer Bash Scripts
  `start` -> `/home/pi/dragon_dev/start`
  `boot` -> `/home/pi/dragon_dev/boot`
  `chmod +x /home/pi/dragon_dev/start`
  `chmod +x /home/pi/dragon_dev/boot`

# Boot Service
  Transfer `dragon_dev.service` to `/lib/systemd/system/dragon_dev.service`
  Add `# Allow dragon to be started without password
       %sudo ALL = (ALL) NOPASSWD: /home/pi/dragon_dev/start` to sudoers using `sudo visudo`

# Git Deployment
  `cd /home/pi/dragon/repo.git`
  `git init --bare`
  Transfer `post-receive` to `/home/pi/dragon_dev/repo.git/hooks`
  `chmod u+x /home/pi/dragon_dev/repo.git/hooks/post-receive`

# hostapd
  Transfer `hostapd.conf` -> `/etc/hostapd/hostapd.conf`
  Replace `#DAEMON_CONF=""` with `DAEMON_CONF="/etc/hostapd/hostapd.conf"` in `/etc/default/hostapd`
  Replace `DAEMON_CONF=""` with `DAEMON_CONF="/etc/hostapd/hostapd.conf"` in `/etc/init.d/hostapd`

# dhcpcd
  Transfer `dhcpcd.conf` -> `/etc/dhcpcd.conf`

# dnsmasq
  Transfer `dnsmasq.conf` -> `/etc/dnsmasq.conf`

# wpa_supplicant
  Transfer `wpa_supplicant-wlan1.conf` -> `/etc/wpa_supplicant/wpa_supplicant-wlan1.conf`
  Add Credentials

# Configure Routing Table
  Replace `#net.ipv4.ip_forward=1` with `net.ipv4.ip_forward=1` in `/etc/sysctl.conf`
  `sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"`

  `sudo iptables -P INPUT ACCEPT`
  `sudo iptables -P FORWARD ACCEPT`
  `sudo iptables -P OUTPUT ACCEPT`
  `sudo iptables -t nat -F`
  `sudo iptables -t mangle -F`
  `sudo iptables -F`
  `sudo iptables -X`

  `sudo iptables -t nat -A POSTROUTING -o wlan1 -j MASQUERADE`
  `sudo iptables -A FORWARD -i wlan1 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT`
  `sudo iptables -A FORWARD -i wlan0 -o wlan1 -j ACCEPT`

  `sudo apt install iptables-persistent` // Yes, save

# Start Services
  `sudo systemctl start wpa_supplicant@wlan1.service`
  `sudo systemctl enable wpa_supplicant@wlan1.service`

  `sudo service hostapd start`
  `sudo service dnsmasq start`

  `sudo systemctl enable dragon_dev`

  `sudo reboot`
