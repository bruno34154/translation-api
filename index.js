const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const translatetext = require("./modules/translation.js");

app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "X-PINGOTHER, Content-Type, Authorization"
        );
        app.use(cors());
        next();
  });

app.post('/translate', async (req, res)=>{
    try{
    const {lang, content} = req.body; //wait for a form with inputs of lang and content
    const translate = {lang: lang,  content: content}
    const translation = await translatetext(translate)
  
        return res.json({message: translation});
    }
    catch{
        return res.json({message: 'erro'});
    }
   
    
    
    
})

app.listen('3004', ()=>{
    console.log("rodando na 3004");
})
