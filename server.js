const express = require('express')
const app = express()
const path = require('path');
prompt = require('prompt');
const { sendNewPackage, doPayment, getCustomerPackages,
     receivePackage, changePassword, checkCustomer } 
     = require('./models/user_mode');

app.get("/", (req, res) => {
});

app.listen(3000)