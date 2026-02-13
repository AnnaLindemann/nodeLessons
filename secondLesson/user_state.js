const EventEmitter = require("events")
const emitter = new EventEmitter()

const changeUserState = (state,emitter) => {
  emitter.emit("stateChange",state)
}

const handler = (state) => {
  console.log(`New state: ${state}`)
}

emitter.on("stateChange", handler)


changeUserState("Registred",emitter)
changeUserState("Logged  in",emitter)

