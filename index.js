const puppeteer = require('puppeteer');
const express = require("express");
const app = express();
const translate = {lang: 'en',  content:"traduza esta mensagem"}
async function translatetext(translate){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url =  `https://translate.google.com/#view=home&op=translate&sl=auto&tl=${translate.lang}&text=${encodeURIComponent(translate.content)}`;
    
    await page.goto(url);
    await page.waitForSelector(".ryNqvb");
    const result = await page.evaluate(()=>{
        return document.querySelector(".ryNqvb").innerText;
    })
   
    console.log(result);
}
translatetext(translate);

translatetext({lang: 'pt',  content:"bullshit"});
