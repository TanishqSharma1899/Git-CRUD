const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'))

//Mongo DB Connection
connectDB();

// parse request to body parser   

app.use(bodyparser.urlencoded({ extended: true }))

// set  view enginer  

app.set("view engine", "ejs")



// app.set ("views", path.resolve(__dirname."views/ejs"))   This is used if we crear a seaprate file for EJS things (if EJS file not created no need to use this step.)

// load assets  
app.use('/Css', express.static(path.resolve(__dirname, "assets/Css")))
app.use('/Img', express.static(path.resolve(__dirname, "assets/Img")))
app.use('/Js', express.static(path.resolve(__dirname, "assets/Js")))
// css/style.css


// app.get("/", (req, res) => {
//     res.send("Crud App");
// })
//  load Routers  
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });