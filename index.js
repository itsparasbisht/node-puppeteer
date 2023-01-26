const puppeteer = require("puppeteer");

let browser = null;
let page = null;

async function login() {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto("https://issueboard.sirpi.co.in/login", {
    waitUntil: "networkidle0",
  });
  await page.type('input[type="text"]', "parash@sirpi.io");
  await page.type('input[type="password"]', "8zgoKBZ5utiKT1qYKG6H");

  await Promise.all([
    page.click(".loginnew_button1__yKuWg"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]).then(() => {
    searchForUser();
  });
}

async function searchForUser() {
  await page.type('input[placeholder="Search"]', "parash@sirpi.io");
  const table = await page.$(".MuiTableBody-root");
  const rows = await table.getProperty("innerText");
  const values = await rows.jsonValue();
  const trimmedValues = values.replace(/\s{2,}\t+/g, " ").trim();

  const data = trimmedValues.split("View");

  const newData = data.map((item) => item.replace(/\t{1,}\n{1,}/g, " "));
  console.log(newData);
}

login();
