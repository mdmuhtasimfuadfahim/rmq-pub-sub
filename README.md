[![Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/mdmuhtasimfuadfahim/rmq-pub-sub)

## rmq-pub-sub

`rmq-pub-sub` is designed based on the [RabbitMQ](https://www.rabbitmq.com/) Pub-Sub functionality. A easier way to call a function named <strong>RMQPubStream</strong> to Produce any stream and consume by <strong>RMQSubStream</strong>.


## Table Of Contents

- [Installation](#installation)
- [Example](#example)
- [How To Contribute](#how-to-contribute)
- [Changelog](#changelog)
- [Project Activity](#project-activity)
- [License](#license)
- [Contact](#contact)


<h2 id="installation">Installation</h2>

```
$ npm i rmq-pub-sub
```
or
```
$ yarn add rmq-pub-sub
```


<h2 id="example">Example</h2>

This example shows you how to create microservice and add pub-sub to communicate between services by `rmq-pub-sub`.

#### Project Structure

<img width="254" alt="project-structure" src="https://github-production-user-asset-6210df.s3.amazonaws.com/69357704/239943567-9e0ed7e0-c7b3-45e6-bcda-f68c5a6d5933.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230522%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230522T161749Z&X-Amz-Expires=300&X-Amz-Signature=a927048e9bab37c3974f863a9708c6b07795e9a89d636c69f9ad20958850f407&X-Amz-SignedHeaders=host&actor_id=69357704&key_id=0&repo_id=640056186">

> Note: Create NodeJS environment in both service-1 and service-2 and create server using your favourite NodeJS framework.

#### service-1/server.js

```js
const RMQPubStream = require('rmq-pub-sub/RMQPubStream');

app.post('/send', async (req, res) => {
    const fakeData = {
        Name: "Md. Muhtasim Fuad Fahim",
        Email: "mdmuhtasim.fahim@gmail.com",
    };

    const produce = await RMQPubStream("FAKE_DATA", fakeData);
    console.log("Producer: ", produce);
    return res.status(200).send("Done!");
});
```

#### service-2/server.js

```js
const RMQSubStream = require('rmq-pub-sub/RMQSubStream');

(async function rmqData() {
    await RMQSubStream("FAKE_DATA").then((data) => {
        console.log("CONSUME: ", data);
    });
})();
```

#### service-1/.env & service-2/.env

```js
AMQP_URL = "amqp://localhost"
```

#### Pull RabbitMQ docker image by the following command

```js
docker run --name rabbitmq -p 5672:5672 rabbitmq
```

Now run the both services in your machine and hit the API: `http://localhost:3002/send` 🥳


<h2 id="how-to-contribute">How To Contribute</h2>

- Fork it 😎
- Create a feature branch: `git checkout -b my-feature`
- Add your changes: `git add .`
- Commit your changes: `git commit -m 'My new feature'`
- Push to the branch: `git push origin my-feature`
- Submit a pull request 

<p align="center">
<i>Contributions, issues and features requests are welcome!</i><br />
<i>📮 Submit PRs to help solve issues or add features</i><br />
<i>🐛 Find and report issues</i><br />
<i>🌟 Star the project</i><br />
</p>


<h2 id="changelog">Changelog</h2>

See [CHANGELOG.md](CHANGELOG.md).


<h2 id="project-activity">Project Activity</h2>

![Alt](https://repobeats.axiom.co/api/embed/f4cb6da776e9edc2d8118aff4e0c1ae9afe37896.svg "Repobeats analytics image")


<h2 id="license">License</h2>

`rmq-pub-sub` is licensed by [MIT License](https://api.github.com/licenses/mit).


<h2 id="contact">Contact</h2>

Copyright © 2023 [Md. Muhtasim Fuad Fahim](https://github.com/mdmuhtasimfuadfahim)

- Github: [@mdmuhtasimfuadfahim](https://github.com/mdmuhtasimfuadfahim)
- LinkedIn: [@mdmuhtasimfuadfahim](https://www.linkedin.com/in/mdmuhtasimfuadfahim)