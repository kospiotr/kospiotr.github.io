Create CT:

```bash
CTID=401
HOSTNAME=dokploy-01
TEMPLATE="local:vztmpl/debian-13-standard_13.1-2_amd64.tar.zst"

pct create $CTID $TEMPLATE \
  --hostname $HOSTNAME \
  --cores 2 \
  --memory 2048 \
  --swap 512 \
  --rootfs local-lvm:64 \
  --net0 name=eth0,bridge=vmbr0,ip6=dhcp,ip=dhcp,firewall=0 \
  --unprivileged 1 \
  --features nesting=1 \
  --password ChangeMe123

pct start $CTID

sleep 10

pct exec $CTID -- apt update
pct exec $CTID -- apt upgrade -y
pct exec $CTID -- bash <<'EOF'
GETTY_OVERRIDE="/etc/systemd/system/container-getty@1.service.d/override.conf"

mkdir -p "$(dirname "$GETTY_OVERRIDE")"

cat >"$GETTY_OVERRIDE" <<'EOT'
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin root --noclear --keep-baud tty%I 115200,38400,9600 $TERM
EOT

systemctl daemon-reload
systemctl restart "$(basename "$(dirname "$GETTY_OVERRIDE")" | sed 's/\.d//')"
EOF

pct exec $CTID -- apt install curl gpg -y
pct exec $CTID -- curl -sSL https://dokploy.com/install.sh | sh
# pct exec $CTID -- bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/addon/dokploy.sh)"
```
