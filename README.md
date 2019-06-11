# hacker-news-app
Implementation of Hacker News

## Installation

Make sure you have docker composer and NPM on your local machine
In the root project directory you can run:

### `sh ./run.sh` SLOW METHOD DUE TO DOCKER

Runs the appplication.<br>
Open [http://localhost:8000](http://localhost:8000) to view it in the browser, once the JS files have built

### Alternatively

In the root project directory you can run:

### `composer install`

### `npm install`

To run the server:

### `symfony server:start` 

In a seperate terminal, in the same directory

### `npm run dev` 

Runs the appplication. But at risk of conflict of local enviroment<br>
Open [http://localhost:8000](http://localhost:8000) to view it in the browser, once the JS files have built


## Testing

In the project directory you can run:

### `npm run test`

Runs the tests

### `npm run test:update`

Runs the tests and removes obsolete snapshots

### `npm run test:coverage`

Runs the tests and runs coverage tests

## Structure

### React

The React application sits within the `/assets` folder 

The application utilises Symfony routing, thus there are entry points to particular React builds, 
these entry points are within the `/pages` folder within the `/assets` folder.

The React application is made up with components, such components are stored within the `/components` folder
within the `/assets` folder.

### Symfony

The Symfony application provides the react application with routing and some parameters, 
for the application to run. The Symfony application can be extended to give some extra functionality.
Like persisting articles to a database to save, and Authentication and Authorization.

### Testing

The tests are withing a root folder `/tests`, and utilise Jest and Enzyme.





