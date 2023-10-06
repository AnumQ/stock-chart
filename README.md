# "stock-example"

## Description

This app gathers stock infomration from [https://eodhd.com/financial-apis/api-for-historical-data-and-volumes/](End-Of-Day Historical Stock Market Data API) and displays the data in a stock chart for different periods; daily, weekly and monthly.

There are two modes, live and demo, toggles between live and demo stock data. 
Live has a limit of max 20 requests a day.

Notes:
- Default stock is set to ´MCD.US´.
- When running on the server, use AAPL.US to test the search function.
- High charts library has been used for visualization of the stock chart. 

## Installation

To get started, install packages.

```
npm i
```

## Development

Runs the app in the development mode.

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

Deploy the project to vercel by running the following command in the root directory.

```
vercel
```
