# Server
sudo ./iodined -f -c -P idaeus 10.0.32.1 t.reuben.science

# Client
sudo iodine -f -P idaeus t.reuben.science

sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -t nat -A POSTROUTING -o dns0 -j MASQUERADE
sudo iptables -A FORWARD -i wlan0 -o eth0 -m conntrack --ctstate NEW -j REJECT
sudo iptables -A FORWARD -i wlan0 -o dns0 -m conntrack --ctstate NEW -j ACCEPT
