import dbConnection from "./config.js";

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )
`;
dbConnection.query(createUsersTable, (err,result) => {
  if(err){
    console.error("Error creating users table",err.stack)
    return
  }

  console.log("Users table created successfully")
    dbConnection.end()
  
})