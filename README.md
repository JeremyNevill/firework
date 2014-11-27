Firework
========

Firework is a Realtime Micrologging Platform and is written using the javascript platform [Meteor](https://www.meteor.com).


Micrologging is what we're calling..

> 'concise log items that have real meaning, are readable by humans, and parsable by computers.'

Firework enables you to record the things you have done, like a to-done list,
from any device that can handle a modern Meteor web interface.

Log items include attributes such as:

* actor(who)
* action(what)
* amount
* units
* date and time.

Once you start adding items you can browse your timeline by attribute and answer
questions such as 'how many miles have I ran this year?' or 'when did I last have a burrito?'


## Get Started

### Nitrous.io

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


### Linux

Setup Meteor

[Install Meteor](https://www.meteor.com/install)

```
curl https://install.meteor.com/ | sh
```

Fork and clone the repo to your development machine/vm
```
git clone git@github.com:JeremyNevill/firework.git
```

Run meteor
```
cd firework
meteor
```

Browse to [localhost:3000](http://localhost:3000)


### Cloud9

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


### Connecting to Mongo Database

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






