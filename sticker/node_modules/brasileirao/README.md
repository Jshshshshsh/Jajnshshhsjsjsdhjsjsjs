<p align="center">
  <a href="https://github.com/godrix/brasileirao/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/godrix/brasileirao/publish.yml"/>
  </a>
  <a href="https://github.com/godrix/brasileirao">
    <img src="https://img.shields.io/github/license/godrix/brasileirao?style=flat"/>
  </a><br/>
  <a href="https://img.shields.io/npm/v/brasileirao">
    <img src="https://img.shields.io/npm/v/brasileirao"/>
  </a>
  <a href="https://img.shields.io/npm/l/brasileirao">
    <img src="https://img.shields.io/npm/l/brasileirao"/>
  </a>
  <a href="https://img.shields.io/npm/dw/brasileirao">
    <img src="https://img.shields.io/npm/dw/brasileirao"/>
  </a>
  <a href="https://github.com/semantic-release/semantic-release?style=flat-square">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"/>
  </a>
  <a href="http://commitizen.github.io/cz-cli">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg"/>
  </a>
  <a href="https://img.shields.io/codecov/c/github/godrix/brasileirao">
    <img src="https://img.shields.io/codecov/c/github/godrix/brasileirao"/>
  </a>
</p>

# Brasileirão
 🇧🇷⚽ A simple package that returns the classification of the Brasileirão
 https://www.npmjs.com/package/brasileirao


## Getting Started

### Prerequisites

```sh
node -v
node: v18
```

## Installing

#### Using npm
```sh
npm install --save brasileirao
```

#### Using Yarn
```sh
yarn add brasileirao
```

## How to use

```js
// const {table} = require('brasileirao')
import {table} from "brasileirao"

// Returns the classification of the Brasileirão A
const serieA = table('a')

/**
 * Get all table data:
 [
  {
    position: 1,
    team: 'Fluminense',
    acronym: 'FLU',
    shield: '...fluminense.png',
    popularName: 'Fluminense',
    points: 6,
    played: 2,
    wins: 2,
    draws: 0,
    losses: 0,
    goalsFor: 5,
    goalsAgainst: 0,
    goalDifference: 5,
    winPercentage: 100,
    recentResults: null,
    positionChange: null
  },
  ...
*/

```


```js
// const {match} = require('brasileirao')
import {match} from "brasileirao"

// Returns the current match of the Brasileirão B
const partidas = match('b')

/**
 * Get currents match data:
 {
  "round_information": {
    "current": 3,
    "last": 38
  },
  "matches": [
    {
      "match_date": "2023-04-28T19:00",
      "match_time": "19:00",
      "teams": {
        "home_team": {
          "badge": "...criciuma.svg",
          "name": "Criciúma",
          "abbreviation": "CRI"
        },
        "away_team": {
          "badge": "...avai-futebol-clube.svg",
          "name": "Avaí",
          "abbreviation": "AVA"
        }
      },
      "home_team_score": null,
      "away_team_score": 0,
      "stadium": {
        "name": "Heriberto Hülse"
      }
    },
  ...
*/

```
## Roadmap

  - [x] Serie A table
  - [x] Serie B table
  - [ ] Serie C table
  - [x] Results of the Series A round
  - [x] Results of the Series B round
  - [ ] Games of the day


## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/godrix/brasileirao/issues).
- Make a fork;
- Create a branck with your feature: `git checkout -b my-feature`;
- Commit changes: `git commit -m 'feat: My new feature'`;
- Make a push to your branch: `git push origin my-feature`.

After merging your receipt request to done, you can delete a branch from yours.

## Running the tests

To run the tests go to the terminal and enter `npm run test`

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/godrix/brasileirao/tags).

## Show your support

Give a ⭐️ if this project helped you!

## :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE.md) for details.

---

Made with ♥ by Godrix :wave: [Get in touch!](https://www.linkedin.com/in/carlosgodri/)