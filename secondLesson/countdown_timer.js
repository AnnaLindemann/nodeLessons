//task 4
const EventEmmiter = require("events")
const emmiter = new EventEmmiter()

function countdown(sec,emmiter){
let remaing = sec

const id = setInterval(() => {
  emmiter.emit("tick", remaing) 

  remaing -= 1


if(remaing < 0){
  clearInterval(id)
  emmiter.emit("end")
}}, 1000);
}
emmiter.on("tick", (rest) => console.log("tick:", rest))
emmiter.on("end", () => console.log("finish"))

countdown(10, emmiter)