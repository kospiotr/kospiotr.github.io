---
title: Proxmox
---

# Receipe: Mount USB drive to LXC container

**On Proxmox host**
```
apt install ntfs-3g
mount -t ntfs-3g /dev/sdb1 /mnt/usb-01
```

Verify:
```
mount | grep usb-01
```

**Bind-mount into the Plex container**

Assume: Container ID = 105

Mount point inside container = /media/usb

```
pct set 105 -mp0 /mnt/usb-01,mp=/media/usb
```

Restart container:

```
pct restart 105
```

Inside container:

```
ls /media/usb
```

# Recipe: Auto login via SSH from Proxmox UI

```
GETTY_OVERRIDE="/etc/systemd/system/container-getty@1.service.d/override.conf"
mkdir -p $(dirname $GETTY_OVERRIDE)
cat <<EOF >$GETTY_OVERRIDE
  [Service]
  ExecStart=
  ExecStart=-/sbin/agetty --autologin root --noclear --keep-baud tty%I 115200,38400,9600 \$TERM
EOF
systemctl daemon-reload
systemctl restart $(basename $(dirname $GETTY_OVERRIDE) | sed 's/\.d//')
```

# Issue: TASK ERROR: Device /dev/dri/card1 does not exist

Root cause: Device /dev/dri/cardX numbering is not stable by design.

Solution: 
Bind your Plex LXC to a stable device path or group, not to a numeric card index.

In LXC container config: `/etc/pve/lxc/<CTID>.conf`:

Add:
```
lxc.mount.entry: /dev/dri dev/dri none bind,optional,create=dir
lxc.cgroup2.devices.allow: c 226:* rwm
```

Comment:
```
#dev0: /dev/dri/renderD128,gid=993
#dev1: /dev/dri/card1,gid=44
```
