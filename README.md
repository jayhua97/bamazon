# Homework 10 - Bamazon

Bamazon lets you purchase items if you're a customer, or lets you manage inventory if you're a manager.

## Getting Started

You'll first need to install a couple node packages for this to work: inquirer and mysql.

```
npm install inquirer
npm install mysql
```

## Running the application

### Customer

Simply type 'node bamazonCustomer.js' to run the application. Once its ran, you will be displayed the catalog of our items. It will ask your for the ID of the item you're interested in purchasing followed by another prompt asking for the quantity. Once entered, if both ID and quantity is valid it will output your total and redisplay the catalog for you to continue shopping!

### Manager

The manager section of the application has more options than the customer. Typing 'node bamazonManager.js' will prompt you four options:

1. View Products for Sale will display the entire catalog thats available.
2. View Low Inventory will only display items that have a quantity less than 5.
3. Add Inventory will allow you to restock any current item.
4. Add New Item will allow you to add a new selection to the catalog.