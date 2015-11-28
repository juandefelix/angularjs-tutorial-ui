# AngularJS Tutorial: sample application (client)

This is the sample application for the
[*Ruby on Rails Tutorial:
Learn Web Development with Rails*](http://www.railstutorial.org/)
by [Michael Hartl](http://www.michaelhartl.com/) done with AngularJS.

## Instructions

Clone repository, create an `env.json` file in the root directory with this structure:
```
{
	"api_server_url": "http://your/api/server/url/here",
	"dev_api_server_url": "http://localhost:8000"
}
```
Change the urls accordingly and then run `npm install` and `bower install`.

For running end to end tests you will also need to run `./node_modules/protractor/bin/webdriver-manager update`.

You are good to go!
