## To get started

    $ npm install

Don't forget to make a `.env` file like the `.env.exanple` and replace `RIOT_API_KEY` in `.env` with your own API key

    $ npm run webpack
    $ npm run dev
    $ Server is listening on localhost:3000

Deployment
  
    $ heroku config:set RIOT_API_KEY=YOUR_RIOT_API_KEY (first time only)
    $ git push heroku master
