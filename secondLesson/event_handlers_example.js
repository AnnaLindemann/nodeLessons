const EventEmmiter = require("events")
const emmiter = new EventEmmiter()

const handler1 = () => {
console.log("Handler first")
}

const handler2 = () => {
  console.log("Handler second")
}

emmiter.on("addHandler", handler1)
emmiter.on("addHandler", handler2)
// emmiter.removeListener("addHandler", handler1)
emmiter.emit("addHandler")
