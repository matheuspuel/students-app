import { Student } from 'src/domain/models/Student'
import { StudentRepository } from 'src/domain/repositories/Student'
import { success } from 'src/utils/Result'

/**
 * In-memory repository implementation.
 *
 * Helps to write fast, reliable unit tests.
 */
export const StudentRepositoryMock = (): StudentRepository => {
  let state: Student[] = []
  let lastIndex = 0

  return {
    getAll: async () => success(state),
    getById: async id => success(state.find(i => i.id === id) ?? null),
    insert: async data => {
      state = [...state, { ...data, id: ++lastIndex }]
      return success(undefined)
    },
    update: async data => {
      state = state.map(i => (i.id === data.id ? data : i))
      return success(undefined)
    },
    deleteById: async id => {
      state = state.filter(i => i.id !== id)
      return success(undefined)
    },
  }
}
