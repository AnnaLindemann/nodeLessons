import { Sequelize } from "sequelize";
import configData from "./config.json" with {type: "json"}

const mode = "development"

const config = configData[mode]

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: Number(config.port),
  dialect: config.dialect,
})


export default sequelize