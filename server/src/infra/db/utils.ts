import mysql from 'mysql2'
import { failure, Result, success } from '../../utils/Result'

type QueryResult =
  | mysql.RowDataPacket[][]
  | mysql.RowDataPacket[]
  | mysql.OkPacket
  | mysql.OkPacket[]
  | mysql.ResultSetHeader

/**
 * Helper to make queries nicer to deal with
 */
export const query =
  (dbConnection: mysql.Connection) =>
  (
    sql: string,
    values?: unknown[] | { [param: string]: unknown },
  ): Promise<Result<mysql.QueryError, QueryResult>> =>
    new Promise(resolve =>
      dbConnection.query(sql, values, (error, result) =>
        resolve(error ? failure(error) : success(result)),
      ),
    )
