Firework
========

Firework is a Real-Time Logging and Analytics Platform. 

* View the test version of Firework at [fwktest.firework.com](http://fwktest.firework.com)
* The official hosted pro version is at [Firework.com](http://firework.com).
* #]l];#';        ngbviClone or fork this open source version from [Github](https://github.com/JeremyNevill/firework).  

Firework is written using [Meteor](https://www.meteor.com) and [MongoDb](http://www.mongodb.com).

This is the README document for the open source version.

The platform consists of 2 main parts:

* Realtime Dashboard
* Logging API

Log items include properties such as:

* actor (who)
* action (what)
* amount
* units
* date and time.

Once log items have been added you can browse the real-time timeline to see what happened when.

Items can be added manually or automatically via the inbound rest API.

Integration to services such as [Zapier](https://zapier.com) enable realtime logging of hundreds of upstream applications.


## Run a Firework Server

To host a test or production version of the Firework server follow the instructions below:

### Linux Hosting

Setup Meteor

[Install Meteor](https://www.meteor.com/install)

```
curl https://install.meteor.com/ | sh
```

Clone the repo to your development machine/vm
```
git clone git@github.com:JeremyNevill/firework.git
```

Run meteor
```
cd firework
meteor
```

Browse to [localhost:3000](http://localhost:3000)



## Develop Firework

We use Nitrous.io and Cloud9 to develop Firework, they provide great web development environments backed by linux servers:

### Nitrous.io Web IDE

[![Hack JeremyNevill/firework on Nitrous](https://d3o0mnbgv6k92a.cloudfront.net/assets/hack-l-v1-d464cf470a5da050619f6f247a1017ec.png)](https://www.nitrous.io/hack_button?source=embed&runtime=meteor&repo=JeremyNevill%2Ffirework)

or

Get a [Nitrious.io account](http://nitrous.io)

Setup a Meteor Box, choose Meteor as the template

Clone the repo to your development machine/vm

```
git clone git@github.com:JeremyNevill/firework.git
```
    
Run meteor
```
cd firework
meteor
```

In Nitrous browse to the dev url by clicking on:
* Preview
  * Port 3000

Note: If you may want contribute back fork your own version, then clone from that.


### Cloud9 Web IDE

[Install Meteor](https://www.meteor.com/install)

```
curl https://install.meteor.com/ | sh
```

Start Meteor on special port and ip that Cloud9 use:

```
meteor --port $IP:$PORT
```

Browse to the secure workspace url, click on the link that appears in the green 'Gloud9 Help' box, e.g.
```
https://firework-jeremynevill.c9.io/
```

Note: Official page on [Meteor on Cloud9](https://docs.c9.io/frameworks_meteor.html)

If you suffer from used port issues on c9 then work out whether apache or some other process has hogged port 8080:
```
lsof -i tcp:$PORT

```

and then kill the process.
```
kill -9 $(lsof -i:$PORT -t)
```


## Connecting to Mongo Database

Meteor uses mongodb as the database layer, connect to the local meteor db as follows:

```
mongo localhost:3001
show dbs
use meteor
db.items.find()
```



## Get in Contact

Please get in contact via twitter [JeremyNevill](https://twitter.com/JeremyNevill) or
email [jeremy@nevill.net](mailto:jeremy@nevill.net)

