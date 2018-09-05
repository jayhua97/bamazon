var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcamp",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    startManager()
})

function startManager() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "mainMenu"
        }
    ]).then(function(input) {
        if (input.mainMenu === "View Products for Sale") {
            viewInventory()
        }
        else if (input.mainMenu === "View Low Inventory") {
            viewLowInventory()
        }
        else if (input.mainMenu === "Add to Inventory") {
            addInventory()
        }
        else if (input.mainMenu === "Add New Product") {
            addNewProduct()
        }
    })
}

function viewInventory() {
    connection.query("SELECT * FROM products", function(err,res) {

        console.log("\n\n------------------------------------")
        console.log("Viewing Inventory")
        console.log("------------------------------------")
        console.log("id | product name | department name | price | quantity")
        
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + 
                        " | " + res[i].price + " | " + res[i].stock_quantity
                        );
            
        }

        console.log("------------------------------------\n\n")
        startManager()
    })     
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity > 0 AND stock_quantity <= 5", function(err,res) {
        
        console.log("\n\n------------------------------------")
        console.log("Viewing LOW Inventory")
        console.log("------------------------------------")
        console.log("id | product name | department name | price | quantity")

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + 
                        " | " + res[i].price + " | " + res[i].stock_quantity
                        );
            
        }

        console.log("------------------------------------\n\n")
        startManager()
    }) 
}

function addInventory() {
    console.log("\n\n------------------------------------")
    console.log("Add Inventory to Existing Item")
    console.log("------------------------------------")
    inquirer.prompt([
        {
            type: "input",
            message: "Type in ID of item you would like to add inventory to: ",
            name: "productId"
        }, 

        {
            type: "input",
            message: "How much would you like to add?",
            name: "productAddQ"
        }
    ]).then(function(input) {
        var queryDB = "SELECT * FROM products WHERE ?"
        connection.query(queryDB, { id : input.productId}, function(err,res) {
            if (err) throw err
            if (res.length === 0) {
                console.log("\nPlease select a valid ID")
                viewInventory();
            }

            else {
                var newQuantity = res[0].stock_quantity + parseInt(input.productAddQ)
                var queryUpdate = "UPDATE products SET ? WHERE ?"
                var query = connection.query(queryUpdate, [
                    {
                        stock_quantity: newQuantity
                    },
                
                    {
                        id: input.productId
                    }
                ], function (error,response) {

                })
                query.sql
                console.log ("\n------Added------")
                viewInventory();
            }
        })
    })
}

function addNewProduct() {
    console.log("\n------Add New Product------\n")

    inquirer.prompt([
        {
            type: "input",
            message: "Name of product: ",
            name: "productName"
        },

        {
            type: "input",
            message: "Product Department: ",
            name: "productDepartment"
        },

        {
            type: "input",
            message: "Price of product: ",
            name: "productPrice"
        },

        {
            type: "input",
            message: "Quantity of product: ",
            name: "productQuantity" 
        }

    ]).then(function(input) {
        console.log ("\n------Added------")
        var query = connection.query("INSERT INTO products SET ?",
            {
                product_name: input.productName,
                department_name: input.productDepartment,
                price: input.productPrice,
                stock_quantity: input.productQuantity
            })

        query.sql;
        viewInventory();

    })  
}
