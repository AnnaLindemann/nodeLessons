const utilsModule = require("./utils.js")
const mathModule = require("./mathModule.js") 

console.log("app started")

utilsModule.greet("Alice")
utilsModule.greet("Bob")
utilsModule.greet("Dima")

mathModule.add(1,2)
mathModule.subtract(2,1)