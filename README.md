# Challenge Worcket

Worcket challenge is a node project to evaluate candidates.

## Requirements

Before the installation, you should have `nvm` in your machine. Download [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Usage

```
git clone https://github.com/molinajulian/challenge-worcket
cd challenge-worcket
npm install (*)
npm start
```
(*) After this, you should create `.env` file in the root project. In there, you must add environment variables.  
In the root project exist `.env.example` file, where you can see an example.                                                          
If it does not sound familiar you can read the following [article](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa).


## Documentation

When the project is running, you can go to the endpoint `/docs` and you will see the endpoints implemented with his your parameters.

## Coverage

For generate to coverage report, you can run `npm run coverage`. This command create `coverage` folder, which contains all information about project coverage.
The actually statiscis are the following

```
Statements: 97.55% (279/286) 
Branches: 84.62% (44/52)
Functions: 94.87% (74/78)
Lines: 98.4% (246/250)

```

## Test

For test, run `npm  test`. It was used [Jest](https://jestjs.io/docs/en/getting-started.html).

## Authors and acknowledgment

Julian Molina