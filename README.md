[![Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/mdmuhtasimfuadfahim/rmq-pub-sub)

## rmq-pub-sub

`rmq-pub-sub` is designed based on the [RabbitMQ](https://www.rabbitmq.com/) Pub-Sub functionality. A easier way to call a function named <strong>RMQPubStream</strong> to Produce any stream and consume by <strong>RMQSubStream</strong>.


## Table Of Contents

- [Installation](#installation)
- [Example](#example)
- [How To Contribute](#how-to-contribute)
- [Test](#test)
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

<img width="254" alt="project structure" src="https://private-user-images.githubusercontent.com/69357704/265891669-8142fc6f-7379-4342-8edd-776f6897e876.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE2OTM5NzQzOTksIm5iZiI6MTY5Mzk3NDA5OSwicGF0aCI6Ii82OTM1NzcwNC8yNjU4OTE2NjktODE0MmZjNmYtNzM3OS00MzQyLThlZGQtNzc2ZjY4OTdlODc2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA5MDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwOTA2VDA0MjEzOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY3YTc2ZWYxZTEwMDA3NjM4ZDMzN2M2MDNjZDU5MmE2YWM1N2YzNzUzMzgxMmQzYzlmZjg4YmI0ZWYyNTEyZDMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.R7aAraovw-QQtBkSK6wxp_tleW0Tjv9ilKHDEJ5a9PA">

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

Now run the both services in your machine and hit the API: `http://localhost:${PORT}/send` 🥳


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


<h2 id="test">Test</h2>

- Fork it 😎
- Clone forked repository: `git clone https://github.com/username/forked-name.git`
- Install the dependencies from root directory: `npm install`
- Rename `.env.example` to `.env`
- Now run: `npm run test` or `npm run test:watch` or `npm run coverage` & see the results 🥳


<h2 id="changelog">Changelog</h2>

See [CHANGELOG.md](CHANGELOG.md).


<h2 id="project-activity">Project Activity</h2>

![Alt](https://repobeats.axiom.co/api/embed/04dedd11c223249d477a5ca5de837a6c6df53551.svg "Repobeats analytics image")


<h2 id="license">License</h2>

`rmq-pub-sub` is licensed by [MIT License](https://api.github.com/licenses/mit).


<h2 id="contact">Contact</h2>

Copyright © 2023 [Md. Muhtasim Fuad Fahim](https://github.com/mdmuhtasimfuadfahim)

- Github: [@mdmuhtasimfuadfahim](https://github.com/mdmuhtasimfuadfahim)
- LinkedIn: [@mdmuhtasimfuadfahim](https://www.linkedin.com/in/mdmuhtasimfuadfahim)
