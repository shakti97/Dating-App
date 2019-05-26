const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const dotenv=require('dotenv');

dotenv.config();

const cors=require('./utils/cors.js');

app.use(cors);
const appRoute=require('./routes/appRoute.js');
app.use('/',appRoute);

app.listen(process.env.PORT || 8080,()=>{
    console.log('Server Started');
})