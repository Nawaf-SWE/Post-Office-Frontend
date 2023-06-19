const Sequelize = require('sequelize');

const sequelize = new Sequelize('master_db', 'root', 'Password', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306
  }
);


const Customer = sequelize.define('Customer', {
  customer_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email:  {
    type: Sequelize.STRING,
    allowNull: false
  },
  password:  {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Password"
  },
  address: Sequelize.STRING,
});


const Package = sequelize.define('Package', {
    package_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    receiver_id:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    shipping_type: {
      type: Sequelize.STRING, 
      validate: {
        isIn: [['express', 'normal']]
      },
      allowNull: false
    },
    cost: Sequelize.FLOAT,
    final_delivery_date: Sequelize.DATE,
    category: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['chemical', 'liquid', 'fragile', 'regular']] 
      }
    },
    payment: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    delivery_status: {
      type: Sequelize.STRING,
      defaultValue: "ontime",
      validate: {
        isIn: [['lost', 'delayed', 'delivered', 'ontime']]
      }
    },
})


Customer.hasMany(Package)
Package.belongsTo(Customer);

sequelize.sync()
  .then(() => console.log('Database and tables created'))
  .catch(err => console.log('Error while creating database', err));


module.exports = { Customer, Package };