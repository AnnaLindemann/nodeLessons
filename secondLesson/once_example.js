const EventEmmiter = require("events")
const emmiter = new EventEmmiter

emmiter.once("functionOnce", () => {
  console.log("Added just one time")
})

emmiter.emit("functionOnce")
emmiter.emit("functionOnce")
emmiter.emit("functionOnce")