DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	PRIMARY KEY (id),
    product_name VARCHAR(30),
	department_name VARCHAR(30),
    price DECIMAL(10, 2),
    stock_quantity INT(10) NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Colgate Toothpaste", "Daily Essentials", 2.50, 350), 
	("Sour Patch Kids", "Food", 2.50, 10000), 
	("Crayola Colored Pencils", "Office Supplies", 8.25, 900),
	("Nintendo Switch", "Video Games", 300, 30),
	("SUPREME Jacket", "Clothing", 9999999, 1),
	("Crystal Geyser Bottled Water", "Food", 0.99, 5000),
    ("Spalding Basketball", "Sports", 15.00, 500),
    ("Camping Tent", "Outdoors", 60, 100),
    ("Kamikaze Album", "Music", 20, 3),
    ("Babolat Tennis Racket", "Sports", 150, 50);

SELECT * FROM products;