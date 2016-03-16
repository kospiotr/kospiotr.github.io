---
layout: wiki
title: Spring Boot
comments: false
toc: true
editurl: wiki/spring-boot.md
---

# Unix launch script

```bash
#!/bin/bash

CMD="$1"
APP="$2"
ENV="$3"

getpid() {
    pid=`pgrep -f "java.*$APP"`
}

status() {
    getpid
    if [ -n "$pid" ]
        then echo "$APP (pid $pid) is running..."
        else echo "$APP is NOT running"
    fi
}

start() {
    getpid
    if [ -n "$pid" ]; then
        echo "$PROJECT (pid $pid) is already running"
        exit 1
    fi
        
    nohup java -jar $APP --env=$ENV --logging.file=$APP.log > /dev/null 2>&1 &
    
    echo -ne "Starting process"
    for i in {1..10}; do
        if ! [ -n "$pid" ]; then
            echo -ne "."
            sleep 1
            getpid
        fi
    done
    echo

    if [ -n "$pid" ]
        then status
        else echo "Error during $PROJECT starting, see log for details."
    fi
}

stop() {
    status
    if [ -n "$pid" ]
    then
        echo -ne "Stopping process"
        kill $pid
        res=$?
        for i in {1..10}; do
            if [ -n "$pid" ]; then
                echo -ne "."
                sleep 1
                getpid
            fi
        done
        echo
        if ! [ -n "$pid" ]
            then echo "$PROJECT has been successfully stopped."
            else echo "Error during $PROJECT stopping... $res"
        fi
    fi
}

usage(){
    echo $"Usage: $0 {start|stop|restart|status} {app-file} {env}"
}

if [ -z "$CMD" ] || [ -z "$APP" ] || [ -z "$ENV" ]; then
    echo "Missing arguments $CMD $APP $ENV"
    usage
    exit 1
fi

case "$CMD" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        stop
        start
        ;;
    *)
        usage
        exit 1
esac

exit 0
```
