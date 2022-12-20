import { query } from 'src/infra/db/utils'
import { dbConnection } from './connection'

/**
 * Creates the tables in case it does not exist yet
 */
export const initiateDb = () =>
  query(dbConnection)(
    'CREATE TABLE IF NOT EXISTS students (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, address varchar(200) NOT NULL, phone varchar(30) NOT NULL, imageId varchar(25), PRIMARY KEY (id))',
  )
