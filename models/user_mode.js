const { Customer, Package } = require('./master_db');
const { Op } = require('sequelize')


// Package = ([package_id], receiver_id, shipping_type, 
//            cost, [final_delivery_date], category, [payment], 
//            [delivery_status], customerCustomerId)
// NOTE: customerCustomerId is the SENDER

// Customer = ([customer_id], username, email, 
//           [password], address)

function sendNewPackage(receiver_id, shipping_type, cost, category, customerCustomerId /* the sender */) {
    Package.create({
        receiver_id: receiver_id,
        shipping_type: shipping_type,
        cost: cost,
        category: category,
        customerCustomerId: customerCustomerId
    }).catch(err => {
        throw err
    })
}

function doPayment(package_id) {
    Package.update({ payment: true }, {where: {package_id: package_id }})
}

function getCustomerPackages(customer_id) {
    Package.findAll({
        where: {
            customerCustomerId: customer_id
        }
    }).then(packages =>{
        if (packages.length >0)
            return packages
        else
            return null
    })
}

function receivePackage(package_id) {
    if (Package.findByPk(package_id)?.dataValues.payment === true)
        Package.update({ delivery_status: "delivered" }, {where: {package_id: package_id }})
    else
        throw new Error("Pay package fee in order to recieve it")
}

function changePassword(newPassword, customer_id) {
    Package.update({ password: newPassword }, { where: { customer_id: customer_id }})
}

function checkCustomer(username, password) {
    Customer.findAll({
        where: {
            username: username,
            password, password
        }
    }).then(customer =>{
        if (customer.length === 1)
            return customer[0].id
        else
            return null
    })
}



// function getCustomers() {
//     return Customer.findAll();
// }
// function getPackages(customer_id) {
//     return Package.findAll({
//         where:{
//             customerCustomerId: customer_id
//         }
//     })
// }

// function changeDestToRUH(package_id){
//     Package.update({ destination: "RUH" }, { where: { package_id: 3 }})
// }


module.exports = {
    sendNewPackage, doPayment, getCustomerPackages, receivePackage, changePassword, checkCustomer
};