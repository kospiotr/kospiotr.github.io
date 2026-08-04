---
layout: post
title:  "Stage Maven archetypes to Central Repository"
description: "Using Sonatype tools for publishing Maven archetypes to Central Repository"
date:   2014-02-27 22:16:00
---

In some future posts I will share how to configure environment for publishing archetypes to the Central Repositories. Basically most of the knowledge is present in the official documentation here: [https://docs.sonatype.org/display/Repository/Sonatype+OSS+Maven+Repository+Usage+Guide](https://docs.sonatype.org/display/Repository/Sonatype+OSS+Maven+Repository+Usage+Guide). 

In this post I will show how to stage your archetypes on already configured environment. The steps are ass follow:

 1. Commit and push all changes to the repository:
 
 ```bash
 git add --all
 git commit -m "Your message"
 git push origin master
 ```
 2. On Windows cofigure and run ssh-agent:
 
 When using Git with SSH you could encourage some issues on Windows platform. Git requiring a passphrase, but Maven has no way to specify an appropriate passphrase, so the releasing process that is described in the next step essentially hangs. Note that this problem is limited to Windows!

  1. The solution is to run ssh-agent. This can be found in ```C:\Program Files (x86)\Git\bin\```. After you run it, it outputs some environment variables that you need to set. For example:

 ```bash
C:\>ssh-agent
SSH_AUTH_SOCK=/tmp/ssh-LhiYjP7924/agent.7924; export SSH_AUTH_SOCK;
SSH_AGENT_PID=2792; export SSH_AGENT_PID;
echo Agent pid 2792;
 ```
 
  2. Next you need to place these in your environment:

  ```bash
 C:\> set SSH_AUTH_SOCK=/tmp/ssh-LhiYjP7924/agent.7924
 C:\> set SSH_AGENT_PID=2792
  ```
 
  3. Finally add the key file and enter your passphrase that will be stored:
 
 ```bash
C:\> ssh-add "/c/Users/Piotr/.ssh/id_rsa" 
 ```
 
 > If you are having trouble with getting it, just execute: ```git fetch origin master``` that will show you the prompt with the key file path.
 
 3. Publishing Snapshots:
 Publishing Snapshots is possible only to [https://oss.sonatype.org/content/repositories/snapshots/](https://oss.sonatype.org/content/repositories/snapshots/) repository. To perform it execute following command:
 
 ```bash
 mvn clean deploy
 ```
 
 4. Publishing Releases to Sonatype:

 ```bash
 mvn release:clean
 mvn release:prepare //this will publish tag in the trunk with Released version and prepare new SNAPSHOT version for next development
 mvn release:perform //actually signs and uploads artefacts to Sonatype Staging repository
 ```
 
 > All releases are being staged to Sonatype repository. They will have to be validated by Central repository rules and only then they could be transferred.
 
 5. Validating and releasing artefacts to the Central Repository:
  * Go to https://oss.sonatype.org/ and login with your Sonatype credentials.
  * Go to ```Staging Repositories``` and select your repository. The staging repository name should look like your groupId without punctuation followed by a number (orgmygroupid-1000).  If you just finished performing your release, it may take a minute or two for the staging repository to appear on the Staging Repositories page.  Also, if there is a long listing of staging repositories with names like central_bundles-*, make sure that you scroll through the listing to find one that bears a name resembling your groupId.
  * Click ```Close``` Button and then in the prompt ```Confirm``` button. This step will close staging process and starts validating artefacts by Central Repository rules. If everything is OK after refreshing the grid, the status of should be ```Closed```.
  * If everything went OK and the staging status is closed you can release it by selecting ```Release``` button.
  * Now it will take some time when Sonatype will transfer all artefacts. This is asynchronous process and it's being performed every 2 hours.