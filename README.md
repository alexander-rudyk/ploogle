## Description

PLOOGLE is a simple search service that uses Google API to get the first 10 results of a Google search. If the results contain the wiki website - this service parses it and gets text and image from article.

### WHY PLOOGLE?

Because this service has a delay for emulating long responses from Google API =)

## Installation

Install dependency

```bash
$ npm install
```

Copy `.env` file and edit with you API key and search engine id:

```bash
cp .env.example .env
```

## Running the app

```bash
# start Redis
$ docker-compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
