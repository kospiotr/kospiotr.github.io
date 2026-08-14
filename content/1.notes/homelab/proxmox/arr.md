---
title: ARR
---

New LXC
```
export CT_ID="501"
mode=generated var_docker_socket="a" var_cpu="2" var_ram="8192" var_disk="16" var_ctid="$CT_ID" var_hostname="arr" var_ipv6_method="dhcp" var_gpu="yes" bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/docker.sh)"
```


Set-up
```
pct set $CT_ID -mp0 /mnt/usb-01,mp=/data
pct exec $CT_ID -- ls -la /data

pct exec $CT_ID -- mkdir -p /data/{torrents/{tv,movies,music},media/{tv,movies,music}}
```

docker-compose.yml
```
###############################################
# Common Keys for all apps
###############################################

x-common-keys: &common-keys
    restart: unless-stopped
    logging:
      driver: json-file
    environment:
      PUID: 1000
      PGID: 1000
      TZ: Europe/London
    dns:
      - 1.1.1.1
      - 1.0.0.1

services:
###############################################
# RADARR - Movies
###############################################
  radarr:
    <<: *common-keys
    container_name: radarr
    image: ghcr.io/hotio/radarr:latest
    ports:
      - 7878:7878
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /docker/appdata/radarr:/config
      - /data:/data

###############################################
# SONARR - TV Shows
###############################################

  sonarr:
    <<: *common-keys
    container_name: sonarr
    image: ghcr.io/hotio/sonarr:latest
    ports:
      - 8989:8989
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /docker/appdata/sonarr:/config
      - /data:/data

###############################################
# LIDARR - Music
###############################################

  lidarr:
    <<: *common-keys
    container_name: lidarr
    image: ghcr.io/hotio/lidarr:latest
    ports:
      - 8686:8686
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /docker/appdata/lidarr:/config
      - /data:/data

###############################################
# BAZARR - Subtitles
###############################################

  bazarr:
    <<: *common-keys
    container_name: bazarr
    image: ghcr.io/hotio/bazarr:latest
    ports:
      - 6767:6767
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /docker/appdata/bazarr:/config
      - /data/media:/data/media

###############################################
# PROWLARR - Indexer Manager
###############################################

  prowlarr:
    <<: *common-keys
    container_name: prowlarr
    image: ghcr.io/hotio/prowlarr:latest
    ports:
      - 9696:9696
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /docker/appdata/prowlarr:/config

###############################################
# QBITTORRENT - Downloader
###############################################

  qbittorrent:
    <<: *common-keys
    container_name: qbittorrent
    image: ghcr.io/hotio/qbittorrent:latest
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
    environment:
      - WEBUI_PORT=8080
      - TORRENTING_PORT=6881
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /docker/appdata/qbittorrent:/config
      - /data:/data

###############################################
# JELLYFIN - Media Server
###############################################

  jellyfin:
    <<: *common-keys
    container_name: jellyfin
    image: ghcr.io/hotio/jellyfin:latest
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /docker/appdata/jellyfin:/config
      - /data/media:/data/media:ro #read-only
    ports:
      - 8096:8096

###############################################
# ARR Stack Dedicated Network
###############################################

networks:
  default:
    name: arr_network

###############################################
###############################################
```

```
docker compose up -d
```

Map to domain:
```
set in the router:
arr.home to the IP
```

## QBitorrent
**First log-in**
Get first password:
```
sudo docker logs qbittorrent
```

Open: http://arr.home:8080 and log-in
Go to `Tools - Options - WebUI` - you can change the user and password here but remember to scroll down and save it.

**Configuration**
In left panel go to Categories - All - right click and 'add category':  

Create categories first and only then configure the steps below, as doing it opposite way round caused the Categories to disappear :) . Save path will be appended to '/data/torrents/ Default Save Path.

For Radarr: 
- `Category: movies`  
- `Save Path: movies` 
For Sonarr: 
- `Category: tv`  
- `Save Path: tv`  
For Lidarr: 
- `Category: music`  
- `Save Path: music`  

With categories created - go to - `Tools - Options - Downloads` and in `Saving Management` make sure your settings match [THIS](https://trash-guides.info/Downloaders/qBittorrent/How-to-add-categories/)  
- Default Torrent Management Mode - Automatic`  
- `When Torrent Category changed - Relocate torrent`  
- `When Default Save Path Changed - Switch affected torrents to Manual Mode`  
- `When Category Save Path Changed - Switch affected torrents to Manual Mode`  
- Tick BOTH BOXES for: `Use Subcategories` and `Use Category paths in Manual Mode` (NOT shown on Trash Guides)  
- Default Save Path: - set to `/data/torrents` (so it matches your folder structure) - 
Scroll down and `Save.

## Prowlarr
Now configure Prowlarr service (each of these services will require to set up user/pass):  

**First log-in**
Open: http://arr.home:9696
Set-up username and password

**Configuration**

`Settings- Download clients` :
- `+` symbol - Add download client - choose `qBittorrent`
- UNTICK the `Use SSL` (unless you have SSL configured in qBittorrent - Tools - Options -WebUI but by default it is not used)  
- Host: qbittorrent
- Port: 8080
- username and password - use the one that you configured for qBittorrent in previous step  
Click `Test` and if Green - Save  

## Radarr

**First log-in**
Open: http://arr.home:7878

**Configuration**

`Settings - Media Management`:
- Add Root Folder` (scroll down to the bottom) - set `/data/media/movies` as your root folder  
- Still in `Settings - Media Management - click Show Advanced - Importing - Use Hardlinks instead of Copy` - make sure its 'ticked'  
- (Optional) `Rename Movies` 
- (Optional) `Delete empty movie folders during disk scan
- (Optional) `Import Extra Files`:  `srt,sub,nfo`
  Save Changes
  
`Settings - Download clients` :
- `+` symbol - Add download client - choose `qBittorrent`
- UNTICK the `Use SSL` (unless you have SSL configured in qBittorrent - Tools - Options -WebUI but by default it is not used)  
- Host: qbittorrent
- Port: 8080
- username and password - use the one that you configured for qBittorrent in previous step 
- category: movies
Click `Test` and if Green - Save  

`Settings - General` :
- scroll down to API key - Copy API key 
- go back to `Prowlarr 
- Settings - Apps`  click `+` Radarr - paste API key.
- API Key: paste API key
- Prowlarr Server: `http://prowlarr:9696`
- Radarr Server: `http://radarr:7878`
Click `Test` and if Green - Save  
  
## Sonarr

**First log-in**
Open: http://arr.home:8989

**Configuration**
 
 `Settings - Media Management 
 - Add Root Folder` - set `/data/media/tv` as your root folder  
 - Show Advanced 
 - Importing - Use Hardlinks instead of Copy` - make sure its 'ticked'  
- (Optional) `Rename Episodes` 
- (Optional) `Delete empty Folders - delete empty series and season folders during disk scan`  
- (Optional) `Import Extra Files`: `.srt, .sub, .nfo`

`Settings - Download clients` :
- `+` symbol - Add download client - choose `qBittorrent`
- UNTICK the `Use SSL` (unless you have SSL configured in qBittorrent - Tools - Options -WebUI but by default it is not used)  
- Host: qbittorrent
- Port: 8080
- username and password - use the one that you configured for qBittorrent in previous step 
- category: tv
Click `Test` and if Green - Save  

`Settings - General` :
- scroll down to API key - Copy API key 
- go back to `Prowlarr 
- Settings - Apps`  click `+` Sonarr - paste API key.
- API Key: paste API key
- Prowlarr Server: `http://prowlarr:9696`
- Sonarr Server: `http://sonarr:8989`
Click `Test` and if Green - Save  

## Lidarr

**First log-in**
Open: http://arr.home:8686

**Configuration**
 
 `Settings - Media Management 
 - Add Root Folder` - name: music, set `/data/media/music` as your root folder  
 - Show Advanced 
 - Importing - Use Hardlinks instead of Copy` - make sure its 'ticked'

`Settings - Download clients` :
- `+` symbol - Add download client - choose `qBittorrent`
- UNTICK the `Use SSL` (unless you have SSL configured in qBittorrent - Tools - Options -WebUI but by default it is not used)  
- Host: qbittorrent
- Port: 8080
- username and password - use the one that you configured for qBittorrent in previous step 
- category: music
Click `Test` and if Green - Save  

`Settings - General` :
- scroll down to API key - Copy API key 
- go back to `Prowlarr 
- Settings - Apps`  click `+` Sonarr - paste API key.
- API Key: paste API key
- Prowlarr Server: `http://prowlarr:9696`
- Sonarr Server: `http://lidarr:8989`
Click `Test` and if Green - Save  

## Bazarr (skip):  

**First log-in**
Open: http://arr.home:6767

**Configuration**

`Languages - Settings` :
- `+` symbol - Add download client - choose `qBittorrent`
- 
`http://host_ip>:6767`  
Languages: Go to Settings > Languages and create a "Language Profile" (e.g., "English" or "Any").  
Providers: Go to Settings > Providers and add your subtitle sources (OpenSubtitles.org, Subscene, etc.). Most require a free account.  
Sync: After connecting Radarr/Sonarr, go to the Series or Movies tab and click "Update" to pull in your existing library.


## Further configuration

Restart services (from proxmox host):
```
pct exec $CT_ID -- docker compose down
pct exec $CT_ID -- docker compose up -d

```

## Jellyfin  

**First log-in**
Open: http://arr.home:8096

**Configuration**
 
 `Settings - Media Management 
[](https://github.com/automation-avenue/arr-new/blob/main/README.md#jellyfin-)

`http://<host ip address>:8096`  
To watch your movies, just log on to Jellyfin, create user and password and you can `Add Media Library`.  
For Content Type - choose `Movies` and find folder `/data/media/movies`.  
Add more content types like TV or Music accordingly, binding them to correct media folder.