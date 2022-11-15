//const puppeteer = require("puppeteer");
let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

let options = {};


async function translatetext(translate) {
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  const url = `https://translate.google.com/#view=home&op=translate&sl=auto&tl=${ translate.lang}&text=${encodeURIComponent(translate.content)}`;

  await page.goto(url);
  await page.waitForSelector(".ryNqvb");
  const result = await page.evaluate(() => {
    return document.querySelector(".ryNqvb").innerText;
  });

  return result;
}
module.exports = translatetext;
