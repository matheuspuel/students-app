import mysql from 'mysql2'
import { envVars } from 'src/envVars'

export const dbConnection = mysql.createConnection({
  host: envVars.MYSQLHOST,
  port: +(envVars.MYSQLPORT || '3306'),
  user: envVars.MYSQLUSER,
  password: envVars.MYSQLPASSWORD,
  database: envVars.MYSQLDATABASE,
})
