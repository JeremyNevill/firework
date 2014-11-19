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


## Getting Started

### [Nitrous.io](http://nitrous.io)

#### Setup a Meteor Box

* Create a new box
  * Choose Meteor as the template

#### Fork and Clone

Fork and clone the repo to your development machine/vm

```
git clone git@github.com:YourGithubAccount/firework.git
```

#### Run Meteor

Run meteor

```
meteor
```

Browse to the Nitrous url by clicking on:
* Preview
  * Port 3000

#### Connect to Mongo Database

```
mongo localhost:3001       
show dbs
use meteor
db.items.find()
```


### Linux

#### Setup Meteor

* [Install Meteor](https://www.meteor.com/install)

#### Fork and Clone

Fork and clone the repo to your development machine/vm

```
git clone git@github.com:YourGithubAccount/firework.git
```

#### Run Meteor

Run meteor

```
meteor
```

Browse to [localhost:3000](http://localhost:3000)



## Get in Contact

Please get in contact via twitter [JeremyNevill](https://twitter.com/JeremyNevill) or
email [jeremy@nevill.net](mailto:jeremy@nevill.net)






