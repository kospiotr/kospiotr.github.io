---
layout: wiki
title: Unix
comments: false
toc: false
editurl: wiki/unix.md
---

# Commands

* `du -sh *` - list all directories and files with its real size
* `du -h * | sort -r | head -50` - 50 heaviest subdirectories with size
* `tar -cvf archived-file.tar ./directory-to-archive` - tar directory to file
* `tar - xvf archived-file.tar` - untar directory to file
* `tar -czvf archived-file.tar.gz ./directory-to-archive` - tar.gz directory to file
* `tar - xzvf archived-file.tar.gz` - untar.gz directory to file
* `scp file.zip username@host:/home/target/path/` - copy file to remote host with scp
* `ps aux | grep java` - display all services with java string
* `python -m SimpleHTTPServer 8000` - very light HTTP server with Python
* `netstat -tulpn | grep 8080` - return process which process listen on port 8080
