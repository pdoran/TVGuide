TVGuide
=======
I built this as a teaching guide for knockout.js. The idea here is to start by showing what the end result should look like,
without the rich features. Then we slowly introduce new changes to the application that show features of knockout
and how they can be used to build a feature rich front end web application.

Usage
=====

```javascript
npm install
node scrape apiKey 
//apiKey = api key to api.trakt.tv (if you are too lazy to get a key, 
//just look at an earlier revision mine is in there)
node index
```

This will bring up a command line:
```
node index
Development server running at http://localhost:8000
```

Valid commands from here are:
* start: reset the tutorial and fire up your default browser to the default url
* next: Move to the next slide, just refresh your browser after each new slide
* back: Moves back to the previous slide


Tips
====

* If you are using this to try and learn knockout, take a look at the source along the way.
* Alternatively you can look at the server\2.html through 6.html and the corresponding JavaScript files.
* If you don't like my taste in tv shows, you can edit the scrape.js file and change the list of tv shows.
* Feel free to fork, and re-use anyway you want.
