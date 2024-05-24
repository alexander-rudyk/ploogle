## Description

PLOOGLE is a simple search service wich use Google API for get 10 first result of search on Google. If results contain the wiki website - this service parse it and get text and image from article.

### WHY PLOOGLE?

Becouse this service has dellay for emulate long response from Google API =)

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
