# node-brawlstars

Javascript library to communicate with BrawlStars API.

## Installation

```bash
$ npm i node-brawlstars
```

## Usage

First see [available API methods in documentation](https://developer.brawlstars.com/#/) and generate token.

This library contains `BrawlClient` class to send messages to Centrifugo from your node-powered backend:

```javascript
const { BrawlClient } = require('node-brawlstars');

// Initialize client instance.
const client = new BrawlClient('TOKEN')
```

## Stay in touch

* Author - [Alexey Filippov](https://t.me/socketsomeone)
* Twitter - [@SocketSomeone](https://twitter.com/SocketSomeone)

## License

[MIT](https://github.com/SocketSomeone/necord/blob/master/LICENSE) © [Alexey Filippov](https://github.com/SocketSomeone)
# node-brawlstars
