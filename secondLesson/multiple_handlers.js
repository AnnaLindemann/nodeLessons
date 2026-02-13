//Task1
const EventEmmiter = require("events")
const emmiter = new EventEmmiter()


const handler1 = ()=> {
console.log("caling handler one")
}

const handler2 = ()=> {
console.log("caling handler two")
}
emmiter.on("callHandler", handler1)
emmiter.on("callHandler", handler2)
emmiter.emit("callHandler")