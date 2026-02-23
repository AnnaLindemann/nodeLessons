const axios = require("axios");

async function getInfo(){
try{
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(response.data);
}catch(err){
  console.error("Request failed", err.message);
}
}

getInfo()