## To get started

    $ npm install

Don't forget to replace `RIOT_API_KEY` in `config.js` with your own API key

    $ npm run webpack
    $ npm run dev
    $ Server is listening on localhost:3000

Deployment
  
    $ heroku config:set RIOT_API_KEY=YOUR_RIOT_API_KEY (first time only)
    $ git push heroku master
