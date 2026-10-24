
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
pct reboot $CT_ID
```

## Install App

Instructions: https://www.filestash.app/docs/install-and-upgrade/

```
pct exec $CT_ID -- curl -o filestash.bin https://downloads.filestash.app/latest/filestash_linux_$(uname -m).bin
pct exec $CT_ID -- chmod +x filestash.bin
pct exec $CT_ID -- ./filestash.bin
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
pct exec $CT_ID -- bash -c '
systemctl daemon-reload
systemctl enable --now filestash.service
'
```


