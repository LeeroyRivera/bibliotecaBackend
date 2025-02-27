require('dotenv').config();
import { Sequelize } from "sequelize";
import { PostgresDialect } from "@sequelize/postgres";

const db = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
})

module.exports = db;