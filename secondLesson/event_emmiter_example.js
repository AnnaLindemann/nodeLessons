const EventEmmiter = require("events")
const emmiter = new EventEmmiter()

// emmiter.on("createUser", (data) => {
//   console.log("User was created")
//   console.log(data)
// })
// emmiter.once("createUser", (data) => {
//   console.log("User was created")
//   console.log(data)
// })
const handler1 = (data) => {
  console.log("User was created")
  console.log(data)
}
const handler2 = (data) => {
  console.log("User 2222222222222222222")
 
}

emmiter.on("createUser", handler1)
emmiter.on("createUser", handler2)

// emmiter.removeListener("createUser", handler1)
emmiter.removeAllListener("createUser")
emmiter.emit("createUser", {id: 43, username: "Alice"})
emmiter.emit("createUser", {id: 43, username: "Alice"})
emmiter.emit("createUser", {id: 43, username: "Alice"})

