
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
