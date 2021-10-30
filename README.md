# Chess

A rudimentary web app for playing chess with a friend via lobbies.

This is my first major TypeScript project, and also a way of getting familiar with web sockets. And also to see how slow an unoptimized JavaScript chess engine really is.

### How to run

```shell
$ npm i
$ NODE_ENV=dev npm run dev
```
(Create a `.env` file from `example.env` for environment variables)

Or in production mode
```shell
$ npm ci
$ npm run build
$ npm start
```

And then navigate to `localhost:8000/chess`. Two players connected to the same room will then be able to trade turns. Rules are enforced, but the UI won't tell you what moves you can make or whether you're in checkmate. You simply won't be able to make a move.
