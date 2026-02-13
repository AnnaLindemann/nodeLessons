//Task 3
const EventEmmiter = require("events")
const emmiter = new EventEmmiter()

const handler = () => {
  console.log("call just once")
}
emmiter.once("addOnce",handler )

emmiter.emit("addOnce")
emmiter.emit("addOnce")