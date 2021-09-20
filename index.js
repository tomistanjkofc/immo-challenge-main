const puppeteer = require("puppeteer");

const PAGE_URL =
  "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10161";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    // write your querySelectors here

    return {
      //description: document.querySelector('#description').textContent,
      description: document.querySelector('meta[property="og:description"]').content,
      title: document.querySelector('meta[property="og:title"]').content,
      price: document.querySelector('#detail-title .price').textContent,
      address: document.querySelector('#detail-title .address').textContent,
    };
  });

  console.log(items);
  const fs = require('fs');
  let podatki = JSON.stringify(items);
  fs.writeFileSync('rezultat.json', podatki);
  return items;
};

main().then((data) => console.log(data));