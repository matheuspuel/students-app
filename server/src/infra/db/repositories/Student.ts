import * as D from 'io-ts/Decoder'
import { StudentDecoder } from 'src/domain/models/Student'
import { StudentRepository } from 'src/domain/repositories/Student'
import { dbConnection } from 'src/infra/db/connection'
import { query } from 'src/infra/db/utils'
import { DatabaseDecodingError, DatabaseQueryError } from 'src/utils/Error'
import { failure, success } from 'src/utils/Result'

export const StudentRepositoryDB: StudentRepository = {
  getAll: async () => {
    const result = await query(dbConnection)(
      'SELECT id, name, address, phone, imageId FROM students',
    )
    if (!result.success) return failure(new DatabaseQueryError(result.error))
    const data = D.array(StudentDecoder).decode(result.value)
    if (data._tag === 'Right') return success(data.right)
    else return failure(new DatabaseDecodingError(data.left))
  },

  getById: async id => {
    const result = await query(dbConnection)(
      'SELECT id, name, address, phone, imageId FROM students WHERE id=?',
      [id],
    )
    if (!result.success) return failure(new DatabaseQueryError(result.error))
    const data = D.array(StudentDecoder).decode(result.value)
    if (data._tag === 'Right') return success(data.right[0] ?? null)
    else return failure(new DatabaseDecodingError(data.left))
  },

  insert: async data => {
    const result = await query(dbConnection)(
      'INSERT INTO students (name, address, phone, imageId) VALUES (?, ?, ?, ?)',
      [data.name, data.address, data.phone, data.imageId],
    )
    if (!result.success) return failure(new DatabaseQueryError(result.error))
    else return success(undefined)
  },

  update: async data => {
    const result = await query(dbConnection)(
      'UPDATE students SET name=?, address=?, phone=?, imageId=? WHERE id=?',
      [data.name, data.address, data.phone, data.imageId, data.id],
    )
    if (!result.success) return failure(new DatabaseQueryError(result.error))
    return success(undefined)
  },

  deleteById: async id => {
    const result = await query(dbConnection)(
      'DELETE FROM students WHERE id=?',
      [id],
    )
    if (!result.success) return failure(new DatabaseQueryError(result.error))
    else return success(undefined)
  },
}
