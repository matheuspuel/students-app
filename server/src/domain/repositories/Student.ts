import { Student, StudentInput } from 'src/domain/models/Student'
import { DatabaseDecodingError, DatabaseQueryError } from 'src/utils/Error'
import { Result } from 'src/utils/Result'

export interface StudentRepository {
  getAll: () => Promise<
    Result<DatabaseQueryError | DatabaseDecodingError, Student[]>
  >
  getById: (
    id: number,
  ) => Promise<
    Result<DatabaseQueryError | DatabaseDecodingError, Student | null>
  >
  insert: (data: StudentInput) => Promise<Result<DatabaseQueryError, void>>
  update: (data: Student) => Promise<Result<DatabaseQueryError, void>>
  deleteById: (id: number) => Promise<Result<DatabaseQueryError, void>>
}
