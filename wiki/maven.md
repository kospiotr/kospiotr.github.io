---
layout: wiki
title: Maven
comments: false
toc: false
---
#Testing
##Skipping tests
Reference: [http://maven.apache.org/surefire/maven-surefire-plugin/examples/skipping-test.html](http://maven.apache.org/surefire/maven-surefire-plugin/examples/skipping-test.html)

 * ```mvn install -DskipTests``` - skip executing tests
 * ```mvn install -Dmaven.test.skip=true``` - skip compiling tests
