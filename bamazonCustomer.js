var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcamp",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
})

function start() {
    showProducts()

}

function showProducts() {
    connection.query("SELECT * FROM products", function(err,res) {
        console.log("\n\n-------------------------------------------------------")
        console.log("id | product name | department name | price | quantity")
        console.log("-------------------------------------------------------")

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + 
                        " | " + res[i].price + " | " + res[i].stock_quantity
                        );
            
        }
        console.log("-------------------------------------------------------\n\n")
        userPrompt();
    })     
}

function userPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "List the ID of the product you would like to buy: ",
            name: "itemID"
        },
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "itemQuantity"
        }

    ]).then(function(input) {
        var queryDB = "SELECT * FROM products WHERE ?"
        connection.query(queryDB, { id : input.itemID }, function(err,res) {
            if (res.length === 0) {
                console.log("Please select a valid item ID")
                showProducts()
            }

            else {
                if (input.itemQuantity <= res[0].stock_quantity) {
                    console.log("\n\nProcessing your order...")
                    var queryUpdateQ = "UPDATE products SET ? WHERE ?"
                    var newQuantity = res[0].stock_quantity - parseInt(input.itemQuantity)
                    var query = connection.query(queryUpdateQ,
                        [ 
                            { 
                                stock_quantity : newQuantity 
                            },

                            { 
                                id : input.itemID 
                            } 
                        ], 

                        function (error, response) {
                    })
                    query.sql;
                    var totalCost = res[0].price * input.itemQuantity;
                    console.log("Your total is $" + totalCost + "!\nThank you for your purchase!")
                } else {
                    console.log("Insufficient quantity. Please input a valid quantity")
                    
                }
                start()
            } 

        })
    })
}