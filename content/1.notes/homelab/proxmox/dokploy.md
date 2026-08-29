# Installation
Single liner:
```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/kospiotr/proxmox/refs/heads/main/dokploy-v3.sh)"
```

Full script:
```

export var_os='debian'
export var_hostname='dokploy'
export var_ram="${var_ram:-4096}"
export var_disk="${var_disk:-30}"

# dokploy works with privileged containers
export var_unprivileged="${var_unprivileged:-0}"

# customization of the swarm network in order to prevent colissions with popular networks like 192.* and 10.*
export var_swarm_addr_pool="${var_swarm_addr_pool:-172.20.0.0/16}"
export var_swarm_addr_pool_mask="${var_swarm_addr_pool_mask:-24}"
export var_portainer='no'
export var_portainer_agent='no'
export var_docker_socket='a'

# hardcoding mac for making custom DHCP port binding persistent
export var_mac='bc:24:11:0c:23:02'

# Createing CT with Docker
source <(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/docker.sh)

# Installing Dokploy
msg_info "Installing Dokploy"
pct exec "$CTID" -- bash -c '
    set -e

    export DOCKER_SWARM_INIT_ARGS="--default-addr-pool '"$var_swarm_addr_pool"' --default-addr-pool-mask-length '"$var_swarm_addr_pool_mask"'"

    echo "Using Docker Swarm address pool: $DOCKER_SWARM_INIT_ARGS"

    curl -sSL https://dokploy.com/install.sh | sh
'

msg_ok "Dokploy installed"
```


# Publish
Map MAC to static IP in your router
Add the DNS name to the IP in the router: dokploy.home
Add the new tunel to point dokploy.pkosmowski.pl to dokploy.home:3000
Secure access to the public domain following instructions: https://www.youtube.com/watch?v=XQXFEV1BIjc&t=309s
# Configuration
1) Domain: app.pkosmowski.pl
2) Project: test
3) Service: hello
	1) Deploy -> Provider -> Git
	2) 
