import { Student, StudentInput } from 'src/domain/models/Student'
import {
  DatabaseDecodingError,
  DatabaseQueryError,
  ResourceNotFoundError,
} from 'src/utils/Error'
import { failure, Result, success } from 'src/utils/Result'
import { StudentRepository } from '../repositories/Student'

/**
 * Get the list of all students
 */
export const getAll =
  (deps: { Repositories: { Student: StudentRepository } }) =>
  async (): Promise<
    Result<DatabaseQueryError | DatabaseDecodingError, Student[]>
  > => {
    return await deps.Repositories.Student.getAll()
  }

/**
 * Get a student by id
 */
export const getById =
  (deps: { Repositories: { Student: StudentRepository } }) =>
  async (
    id: number,
  ): Promise<
    Result<
      DatabaseQueryError | DatabaseDecodingError | ResourceNotFoundError,
      Student
    >
  > => {
    const result = await deps.Repositories.Student.getById(id)
    if (!result.success) {
      return failure(result.error)
    } else if (result.value) {
      return success(result.value)
    } else {
      return failure(new ResourceNotFoundError())
    }
  }

/**
 * Create a new student
 */
export const insert =
  (deps: { Repositories: { Student: StudentRepository } }) =>
  async (data: StudentInput): Promise<Result<DatabaseQueryError, void>> => {
    return await deps.Repositories.Student.insert(data)
  }

/**
 * Update a student's details
 */
export const update =
  (deps: { Repositories: { Student: StudentRepository } }) =>
  async (data: Student): Promise<Result<DatabaseQueryError, void>> => {
    return await deps.Repositories.Student.update(data)
  }

/**
 * Remove a student by id
 */
export const deleteById =
  (deps: { Repositories: { Student: StudentRepository } }) =>
  async (id: number): Promise<Result<DatabaseQueryError, void>> => {
    return await deps.Repositories.Student.deleteById(id)
  }
