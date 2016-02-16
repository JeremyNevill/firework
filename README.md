Firework
========

Firework is a Real-time Logging App for IOT and websites.

Firework is [open source](https://github.com/JeremyNevill/firework) and can be installed on Linux, OS X and Windows.

Try out the latest hosted version at [Firework.com](http://firework.com) or install your own Firework server.


# Getting Started

For full documentation including installation visit the official documentation at:

* [Firework Official Documentation](http://docs.firework.com/v1.0/docs)

Alternatively, follow the instructions below:


# Installation

Installation is straightforward and should only take a couple of minutes depending on your internet connection.  

There are two main steps:

* Install Meteor
* Install Firework


# Install Meteor

Firework uses [Meteor](https://www.meteor.com/) so the first task is to install the latest version of Meteor.  


## Linux and Mac

To install Meteor on Linux and the Mac:

```
curl https://install.meteor.com/ | sh
```


## Windows

Download the installer from the [Meteor Installation Page](https://www.meteor.com/install).

**Note:** For further information go to the [Meteor Installation Page](https://www.meteor.com/install) and follow the instructions for your operating system.


# Install Firework

To install Firework clone the latest version from Github or fork and clone your own version.

To clone from github:

```
git clone git@github.com:JeremyNevill/firework.git
```
      
To fork then clone:

* Go to the [github Firework page](https://github.com/JeremyNevill/firework) 
* Click on the Fork button (top right)
* When the fork has completed, clone from your newly created fork as above


# Running Firework

To run Firework navigate to the directory you have cloned and run Meteor, e.g. 

```
cd firework
meteor
```

Note: If you are running Firework on c9.io then the command is: ```meteor --port $IP:$PORT```

Once the server has started point your browser at [http://localhost:3000/](http://localhost:3000/) to visit the real-time dashboard.
 

---

# Quick Links

* [Documentation and Support](http://docs.firework.com)
* [Github Repo](https://github.com/JeremyNevill/firework)
* [Test Server Continously Deployed from Github](http://fwktest.firework.com)
* [Hosted Version](http://firework.com)


# Build Status

[ ![Codeship Status for JeremyNevill/firework](https://codeship.com/projects/97a5df70-7d9d-0132-709d-2e32b970dd46/status?branch=master)](https://codeship.com/projects/56753)

Passing builds are continuously deployed to the [test server](http://fwktest.firework.com). 


# Description

Firework provides:

* Realtime Web Dashboard
* Logging API - REST with Json Body

Log items include properties such as:

* actor (who)
* action (what)
* amount
* units
* date and time.

Once log items have been added you can browse the real-time timeline to see what happened when.

Items can be added via the inbound rest API or manually through the dashboard.

Integration to online services such as [Zapier](https://zapier.com) enable realtime logging of hundreds of upstream devices and applications.

For comprehensive instructions visit the [documentation and support](http://docs.firework.com) website.


# Requirements

Firework can be deployed on Linux, OS X, and Windows operating systems.

Firework requires [Meteor v1.2](https://www.meteor.com) which in turn uses [MongoDb](http://www.mongodb.com) and [Node JS](https://nodejs.org).


# Get in Contact

We'd love to hear what you think of Firework, get in contact via twitter [JeremyNevill](https://twitter.com/JeremyNevill) or
email [jeremy@nevill.net](mailto:jeremy@nevill.net).



