# Application API
![Build Status](https://travis-ci.org/rahuldean/apps-balance-buddy.svg?branch=v2.0.0)

## Overview
Collection of all the APIs needed for the application

## End Points
| End Point | Description |
|-----------| ----------- |
| GET /api/Operators | Get the list of all available operators |
| GET /api/Codes | Get the list of ussd codes for an operator |

## Headers
Every api call must include the following headers

| Header Name | Description |
| ----------- | ----------- |
| X-Mashape-Proxy-Secret | Mashape secret key |

## Response
The returned MIME type for all requests is ``` application/json ```

## Environment Variables

| Variable Name | Description |
| ----------- | ----------- |
| SERVER_IP | The ip address at which you want the application to run (default: ```localhost```) |
| SERVER_PORT | The port at which you want the application to run (default: ```8003```) |
| MONGODB | The url of your mongo database (default: ``` mongodb://localhost:27017/BalanceBuddy ```) |
| MASHAPE_SECRET | The mashape secret key your application accepts (default: ```VagueAPIKey```) |

Note:
Manage the above environment settings from ``` config/environment.js ```

## Run Tests
``` ENVIRONMENT=test npm test ```

## Run Application
```
npm install
node index.js
```
