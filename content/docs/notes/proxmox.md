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
