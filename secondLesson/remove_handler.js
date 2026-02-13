const EventEmmitter = require("events")
const emmiter = new EventEmmitter()
//task 2
const handler = () => console.log("Check done")
emmiter.on("check", handler)
emmiter.removeListener("check", handler)
emmiter.emit("check")
