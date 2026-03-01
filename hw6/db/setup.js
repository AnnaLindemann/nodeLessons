import dbConnection from "./db.js";

const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price DECIMAL(10,2) NOT NULL
)
`
dbConnection.query(createProductsTable, (err, resilt) => {
  if(err){
    console.error("Error creating users table:", err.stack);
    return;
  }

  console.log("Products table created successfully");
  dbConnection.end();
})