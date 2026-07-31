const fs = require("fs");

const API_KEY = process.env.FMP_API_KEY;

// Read companies.json
const companies = JSON.parse(
  fs.readFileSync("companies.json", "utf8")
);


async function getPrice(ticker) {
  const url =
    `https://financialmodelingprep.com/stable/quote/${ticker}?apikey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${ticker}: API request failed`);
  }

  const data = await response.json();

  return data[0];
}


async function main() {
  const stocks = {};

  for (const company of companies) {
    try {
      console.log(`Getting ${company.ticker}...`);

      const quote = await getPrice(company.ticker);

      stocks[company.ticker] = {
        name: company.name,
        price: quote.price,
        change: quote.change,
        marketCap: quote.marketCap
      };

    } catch (error) {
      console.log(error.message);
    }
  }

  fs.writeFileSync(
    "stocks.json",
    JSON.stringify(stocks, null, 2)
  );

  console.log("Finished!");
}


main();
