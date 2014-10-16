---
layout: wiki
title: Unix
comments: false
toc: false
editurl: wiki/unix.md
---

# Commands

* `du -sh *` - list all directories and files with its real size
* `tar -cvf archived-file.tar ./directory-to-archive` - tar directory to file
* `tar - xvf archived-file.tar` - untar directory to file
* `scp file.zip username@host:/home/target/path/` - copy file to remote host with scp
* `ps aux | grep java` - display all services with java string
* `python -m SimpleHTTPServer 8000` - very light HTTP server with Python
* `du -h * | sort -rh | head -50` - 50 heaviest subdirectories with size
* `netstat -tulpn | grep 8080` - return process which process listen on port 8080
