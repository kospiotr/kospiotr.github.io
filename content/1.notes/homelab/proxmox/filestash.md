
---
title: ARR
---

## New LXC
```
export CT_ID="201"
mode=generated var_docker_socket="a" var_cpu="2" var_ram="8192" var_disk="16" var_ctid="$CT_ID" var_hostname="filestash" var_ipv6_method="dhcp" var_gpu="yes" bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/docker.sh)"
```


## Set-up HDD
```
pct set $CT_ID -mp0 /mnt/usb-01,mp=/data
pct exec $CT_ID -- ls -la /data
```

## Run app on boot

Prepare service:
```
pct exec $CT_ID -- bash -c 'cat > /etc/systemd/system/filestash.service <<'"'"'EOF'"'"'
/etc/systemd/system# cat filestash.service 
[Unit]
Description=File Stash
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/root/filestash.bin
Restart=on-failure
RestartSec=5
User=root
WorkingDirectory=/root

[Install]
WantedBy=multi-user.target
EOF'
```

Install and run service
```
pct exec $CT_ID -- bash -c 'cat > /tmp/setup.sh <<'"'"'EOF'"'"'
#!/bin/bash
/etc/systemd/system/myapp.service

echo "Starting setup..."
apt-get update
apt-get install -y curl

echo "Setup complete!"
EOF
bash /tmp/setup.sh'
```
